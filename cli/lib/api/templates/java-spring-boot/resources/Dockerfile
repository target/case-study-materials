FROM gradle:jdk8
ADD --chown=gradle . /app
COPY . /app
WORKDIR /app
CMD ["gradle", "--stacktrace", "run"]
