
#APP_ENV=development
#APP_DEV_MODE=1


APP_REPO="docker.io/editorbank/"
APP_NAME="datalens-ui"
APP_VERSION="0.955.0"
APP_MODE="full"
APP_ENV="production"
APP_INSTALLATION="opensource"
AUTH_POLICY="disabled"
HC=0

docker build . -t $APP_REPO$APP_NAME:$APP_VERSION
# docker save -o $APP_NAME-$APP_VERSION.img $APP_REPO$APP_NAME:$APP_VERSION
# docker push $APP_REPO$APP_NAME:$APP_VERSION