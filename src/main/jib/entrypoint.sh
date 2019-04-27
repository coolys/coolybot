#!/bin/sh

echo "The application will start in ${COOLYBOT_SLEEP}s..." && sleep ${COOLYBOT_SLEEP}
exec java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -cp /app/resources/:/app/classes/:/app/libs/* "io.cooly.crawler.GatewayApp"  "$@"
