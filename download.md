---
title: Downloads
---

## Current Version
The current version of Jython is 2.7.4.
It can be applied:
- By downloading the [Jython Installer](https://repo1.maven.org/maven2/org/python/jython-installer/2.7.4/jython-installer-2.7.4.jar).
  Use this to install Jython as an application locally.
  (Descriptive metadata [here](https://central.sonatype.com/artifact/org.python/jython-installer).)
- As a [dependency in your build](https://central.sonatype.com/artifact/org.python/jython-slim).
  Embed Jython in a Java application using the snippet provided for your preferred build tool.
- As the [Jython Standalone JAR](https://repo1.maven.org/maven2/org/python/jython-standalone/2.7.4/jython-standalone-2.7.4.jar).
  Download this to run Jython without installing, or as a JAR on the class path of a Java application.
  Some users cite this as
  [a dependency](https://central.sonatype.com/artifact/org.python/jython-standalone).

For information on installing see [Installation](installation).

This version is supported on Java 8 (minimum) and 11.


## Previous Versions
Previous versions of Jython are available from:
- [Jython Installer](https://central.sonatype.com/artifact/org.python/jython-installer/versions)
- [Jython Slim JAR](https://central.sonatype.com/artifact/org.python/jython-slim/versions)
- [Jython Standalone](https://central.sonatype.com/artifact/org.python/jython-standalone/versions)
Follow the "Browse" link for the version of your choice and take the JAR file.


## OpenPGP Public Keys

Release files for supported releases are signed by the following:
- Jeff Allen (2.7.2 onwards) (key id: 875C3EF9DC4638E3)
- Frank Wierzbicki (2.7.1 and earlier) (key id: 3979A71621665974) 

You can validate these keys, using the installer as an example:

```bash
gpg --keyserver hkps://keyserver.ubuntu.com --recv-keys [key id]

gpg --verify jython-installer-[x.y.z].jar.asc \
    jython-installer-[x.y.z].jar
```

GPG will report `Good signature from [release owner]`.

GPG may also report a warning unless you explicitly tell it to trust the key.
This is not necessary for one-off verification.
The warning is
[explained here](https://security.stackexchange.com/questions/147447/gpg-why-is-my-trusted-key-not-certified-with-a-trusted-signature).
The signing keys are listed above to allow validation independent of the file repository.


