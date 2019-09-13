FROM gradle:jdk8
ADD --chown=gradle . /work
COPY . /work
WORKDIR /work
CMD ["gradle", "--stacktrace", "run"]