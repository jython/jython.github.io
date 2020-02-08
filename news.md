---
title: News
---
## News

### Jython 2.7.2 beta (v2.7.2b3 February 2020)

A further beta release is now available for Jython 2.7.2 at
[Maven Central](https://search.maven.org/search?q=g:org.python).
It is built and tested with Java 8 and tested against Java 11.
This fixes bugs raised in response to v2.7.2b2 and updates certain JARs.
Although past predictions of releases have not been very reliable,
we predict a release candidate in the week beginning 24 February.

Notable new features are as already listed for v2.7.2b2.

Fixed bugs are listed in [NEWS](https://github.com/jythontools/jython/blob/v2.7.2b3/NEWS).


### Jython 2.7.2 beta (v2.7.2b2 November 2019)

A beta release is now available for Jython 2.7.2 at [Maven Central](https://search.maven.org/search?q=g:org.python).
It is tested against Java 8 and Java 11.
This has been a long time in the making, as there were quite a few bugs known that we deemed it necessary to fix.

Notable new features include:
 - A "slim" JAR that may be cited in Gradle and Maven builds, so you can take control of dependencies.
 - Elimination (nearly everywhere) of the Java 9+
   [reflective access warning](https://docs.oracle.com/javase/9/migrate/#GUID-7BB28E4D-99B3-4078-BDC4-FC24180CE82B).
 - Much improved support for `locale`, when you opt in via the property `python.locale.control=settable`.
 - Console messages are now produced via `java.util.logging` and the `org.python` name space for you to manage.
 - Jython command options are now closer to the CPython equivalent.
 
Numerous instances are corrected where we mis-handled the encoding of file, user and host names,
which has been a frequent problem for users where ASCII won't do.
Many more fixed bugs are listed in [NEWS](https://github.com/jythontools/jython/blob/v2.7.2b2/NEWS).


### New website (October 2018)
Welcome to the new Jython website. The main improvements are:
- Redesign to fit the modern web, e.g. mobile responsive
- Move hosting to [GitHub pages](https://pages.github.com/). To allow easier maintenance and encourage community contribution
- Delivered over HTTPS
- Content updated to reflect latest binary releases

### Jython 2.7.1 Final Released (July 2017)

We thought 2017-07-01 was a perfect time to release version 2.7.1 This is a bugfix release. Bug fixes include improvements in SSL and pip support along with lots of improvements in CPython compatibility.

Please see the [NEWS](https://github.com/jythontools/jython/blob/master/NEWS) file for detailed release notes. This release of Jython requires JDK 7 or above.

This release is being hosted at maven central. There are three main distributions. In order of popularity:

- Most likely, you want the [traditional installer](http://search.maven.org/remotecontent?filepath=org/python/jython-installer/2.7.1/jython-installer-2.7.1.jar). NOTE: the installer automatically installs pip and setuptools (unless you uncheck that option), but you must unset `JYTHON_HOME` if you have it set.
- A [pre-built standalone version](http://search.maven.org/remotecontent?filepath=org/python/jython-standalone/2.7.1/jython-standalone-2.7.1.jar).

### Jython 2.7.0 Final Released (May 2015)

Please see the [NEWS](https://github.com/jythontools/jython/blob/master/NEWS) file for detailed release notes.

On behalf of the Jython development team, I'm pleased to announce that the final release of Jython 2.7.0 is available! It's been a long road to get to 2.7, and it's finally here! I'd like to thank Amobee for sponsoring my work on Jython. I'd also like to thank the many contributors to Jython, including - but not limited to - bug reports, patches, pull requests, documentation changes, support emails, and fantastic conversation on Freenode at #jython.

Along with language and runtime compatibility with CPython 2.7.0, Jython 2.7 provides substantial
support of the Python ecosystem. This includes built-in support of pip/setuptools (you can use with bin/pip) and a native launcher for Windows (bin/jython.exe), with the implication that you can finally install Jython scripts on Windows.

Jim Baker presented a [talk](https://www.youtube.com/watch?v=hLm3garVQFo) at PyCon 2015 about Jython 2.7, including demos of new features.

Please see the NEWS file for detailed release notes. This release of Jython requires JDK 7 or above.

This release is being hosted at [maven central](http://search.maven.org/). There are three main distributions. In order of popularity:
Most likely, you want the traditional installer. NOTE: the installer automatically installs pip and setuptools (unless you uncheck that option), but you must unset JYTHON_HOME if you have it set.See the installation instructions for using the installer.
A pre-built standalone version. See the installation instructions for details about standalone mode.
A source only distribution.
To see all of the files available including checksums, go here and navigate to the appropriate distribution and version.

From announcement on [Frank Wierzbickis Weblog](http://fwierzbicki.blogspot.fi/2015/05/jython-270-final-released.html)

### Jython 2.7 Release Candidate 3 Released (April 2015)

Please see the [NEWS](https://github.com/jythontools/jython/blob/master/NEWS) file for detailed release notes.

On behalf of the Jython development team, I'm pleased to announce that the third release candidate of Jython 2.7 is available! I'd like to thank Amobee for sponsoring my work on Jython. I'd also like to thank the many contributors to Jython.

This release of Jython requires JDK 7 or above.

This release is being hosted at [maven central] (http://search.maven.org/). There are three main distributions. In order of popularity:
Most likely, you want the [traditional installer](http://search.maven.org/remotecontent?filepath=org/python/jython-installer/2.7-rc3/jython-installer-2.7-rc3.jar). See the installation instructions for using the installer.
A pre-built standalone version. See the installation instructions for details about standalone mode.
A source only distribution.
To see all of the files available including checksums, go here and navigate to the appropriate distribution and version.


From announcement on [Frank Wierzbickis Weblog](http://fwierzbicki.blogspot.fi/2015/04/jython-27-release-candidate-3-available.html)

### Jython 2.7 PyCon 2015 Talk (April 2015)

Jim Baker gave a talk at PyCon 2015 in Montreal about how we got to Jython 2.7 and what's coming next. [Watch the video here](https://www.youtube.com/watch?v=hLm3garVQFo&gt)

