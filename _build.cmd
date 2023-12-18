
::APP_ENV=development
::APP_DEV_MODE=1


@set APP_REPO=docker.io/editorbank/
@set APP_NAME=datalens-ui
@set APP_VERSION=0.955.0
@set APP_MODE=full
@set APP_ENV=production
@set APP_INSTALLATION=opensource
@set AUTH_POLICY=disabled
@set HC=0

docker build . -t %APP_REPO%%APP_NAME%:%APP_VERSION%
# docker save -o %APP_NAME%-%APP_VERSION%.img %APP_REPO%%APP_NAME%:%APP_VERSION%
# docker push %APP_REPO%%APP_NAME%:%APP_VERSION%