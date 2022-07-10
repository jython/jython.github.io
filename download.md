---
title: Downloads
---

## Current Version
The current version of Jython is 2.7.2
It can be downloaded here:
- [Jython Installer](https://repo1.maven.org/maven2/org/python/jython-installer/2.7.2/jython-installer-2.7.2.jar) - Use this to install Jython.
  ([metadata](https://search.maven.org/artifact/org.python/jython-installer/2.7.2/jar))
- [Jython Standalone](https://repo1.maven.org/maven2/org/python/jython-standalone/2.7.2/jython-standalone-2.7.2.jar) - Use this to run Jython without installing or to embed Jython in a Java application.
  ([metadata](https://search.maven.org/artifact/org.python/jython-standalone/2.7.2/jar))
- You may cite Jython 2.7.2 as a
  [dependency in your Maven or Gradle build](https://search.maven.org/artifact/org.python/jython-slim/2.7.2/jar).

For information on installing see [Installation](installation).

This version is supported on Java 8 (minimum) and 11.


## Current Beta Version
A beta version is available (Jython 2.7.3b1).
It can be downloaded here:
- [Jython Installer](https://repo1.maven.org/maven2/org/python/jython-installer/2.7.3b1/jython-installer-2.7.3b1.jar) - Use this to install Jython.
  ([metadata](https://search.maven.org/artifact/org.python/jython-installer/2.7.3b1/jar))
- [Jython Standalone](https://repo1.maven.org/maven2/org/python/jython-standalone/2.7.3b1/jython-standalone-2.7.3b1.jar) - Use this to run Jython without installing or to embed Jython in a Java application.
  ([metadata](https://search.maven.org/artifact/org.python/jython-standalone/2.7.3b1/jar))
- You may cite Jython 2.7.3b1 as a
  [dependency in your Maven or Gradle build](https://search.maven.org/artifact/org.python/jython-slim/2.7.3b1/jar).


## Previous Versions
Previous versions of Jython are available from:
- [Jython Installer](https://search.maven.org/artifact/org.python/jython-installer)
- [Jython Standalone](https://search.maven.org/artifact/org.python/jython-standalone)

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

GPG may also report a warning unless you explicitly tell it to trust the key. This is not necessary for one-off verification. The warning is [explained here](https://security.stackexchange.com/questions/147447/gpg-why-is-my-trusted-key-not-certified-with-a-trusted-signature). The signing keys are listed above to allow validation independent of the file repository.


