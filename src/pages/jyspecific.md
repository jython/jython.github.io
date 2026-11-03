---
title: Jython-Specific Features
layout: ../layouts/BaseLayout.astro
---

# Jython-Specific Features

Jython has a number of features which allow easier integration with Java and make use of the rich environment provided by joining the two languages.


## The Jython Registry

Jython works with a [local Jython registry file](registry) to provide a platform independent equivalent to the Windows registry. It combines this with environment variable and command line information at startup.


## Embedding

Java classes can be [embedded in Python scripts](https://jython.readthedocs.io/en/latest/chapter10/#using-java-within-jython-applications), and Python scripts invoked and inspected [from Java code](https://jython.readthedocs.io/en/latest/chapter10/#using-jython-within-java-applications).


## Collection and Array support

Jython provides ways to smoothly integrate [Java collections and arrays](https://jython.readthedocs.io/en/latest/chapter2/#jython-specific-collections) with Python data structures.


## Compiling to Java class files

The [`compileall` module](https://docs.python.org/2.7/library/compileall.html) in Jython produces Java byte code in Java class files from Python code. It otherwise corresponds to the CPython module of the same name. (Earlier versions used a tool called jythonc which was removed fully in Jython 2.5).


## Database interaction

The [zxjdbc module](https://jython.readthedocs.io/en/latest/chapter12/) provides a Pythonesque interface on top of the Java Database Connectivity API (JDBC).