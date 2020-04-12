#!/bin/sh
set -e

# Directory to deploy to now
DEPLOY_DIR=dist

# Deployment environment (eg. dev, staging, prod)
DEPLOYMENT_ENVIRONMENT="$1"

# Set alias domain based on deployment environment
case "$DEPLOYMENT_ENVIRONMENT" in
    "prod" )
        ALIAS_DOMAIN=$PROD_DOMAIN
        ;;
    "staging" )
        ALIAS_DOMAIN=$STAGING_DOMAIN
        ;;
    "dev" )
        ALIAS_DOMAIN=$DEV_DOMAIN
        ;;
esac

echo "Starting deployment"

cp now.json $DEPLOY_DIR
mkdir -p $DEPLOY_DIR/.now

cat > $DEPLOY_DIR/.now/project.json <<- EOM
{
    "projectId": "$ZEIT_PROJECT_ID",
    "orgId": "$ZEIT_ORG_ID"
}
EOM

# Open a file descriptor to temporarily hold the deployment URL
exec 9>&1

# Prepare deploy command args
set -- \
    -t $ZEIT_TOKEN \
    -A $DEPLOY_DIR/now.json \
    -Q $DEPLOY_DIR/.now \
    -S $ZEIT_SCOPE \
    -c

if [ $DEPLOYMENT_ENVIRONMENT = "prod" ]; then
    # Set prod flag for production deploy
    set -- "$@" --prod
fi

echo "Deploying from $CI_COMMIT_REF_NAME to $DEPLOYMENT_ENVIRONMENT..."

# Start deployment and get deployment URL
DEPLOYMENT_URL=$(now -C "$@" deploy $DEPLOY_DIR | tee /dev/fd/9)

if [ -z $DEPLOYMENT_URL ]; then
    exit 1
fi

DEPLOYMENT_DOMAIN=$(echo $DEPLOYMENT_URL | awk -F[/:] '{print $4}')

exec 9>&-

printf "\nDeployment URL: %s\n" $DEPLOYMENT_URL
printf "\nAliasing to: %s\n" $ALIAS_DOMAIN

# Point alias domain to deployment domain
now alias set "$DEPLOYMENT_DOMAIN" "$ALIAS_DOMAIN" \
    -Q $DEPLOY_DIR/.now \
    -t $ZEIT_TOKEN \
    -S $ZEIT_SCOPE
