FROM openjdk:8-jre-alpine

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    COOLYBOT_SLEEP=0 \
    JAVA_OPTS=""

# Add a coolybot user to run our application so that it doesn't need to run as root
RUN adduser -D -s /bin/sh coolybot
WORKDIR /home/coolybot

ADD entrypoint.sh entrypoint.sh
RUN chmod 755 entrypoint.sh && chown coolybot:coolybot entrypoint.sh
USER coolybot

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 8080 5701/udp

ADD *.war app.war

