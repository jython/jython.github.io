---
title: Jython-Specific Features
---

{% assign book = site.data.book.baseurl %}
{% assign datatypes   = book | append: site.data.book.datatypes['url'] %} 
{% assign integration = book | append: site.data.book.integration['url'] %} 
{% assign database    = book | append: site.data.book.database['url'] %} 

# Jython-Specific Features

Jython has a number of features which allow easier integration with Java and make use of the rich environment provided by joining the two languages.


## The Jython Registry

Jython works with a [local Jython registry file](registry) to provide a platform independent equivalent to the Windows registry. It combines this with environment variable and command line information at startup.


## Embedding

Java classes can be [embedded in Python scripts]({{integration}}#using-java-within-jython-applications), and Python scripts invoked and inspected [from Java code]({{integration}}#using-jython-within-java-applications).  


## Collection and Array support 

Jython provides ways to smoothly integrate [Java collections and arrays]({{datatypes}}#jython-specific-collections) with Python data structures. 


## Compiling to Java class files

The [`compileall` module]({{site.data.pydoc.liburl}}compileall.html) in Jython produces Java byte code in Java class files from Python code. It otherwise corresponds to the CPython module of the same name. (Earlier versions used a tool called jythonc which was removed fully in Jython 2.5).


## Database interaction

The [zxjdbc module]({{database}}) provides a Pythonesque interface on top of the Java Database Connectivity API (JDBC).


