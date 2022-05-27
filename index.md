---
title: Home
---
## What is Jython?
Jython is a [Java](https://go.java/index.html) implementation of [Python 2](https://www.python.org/) that combines expressive power with clarity. Jython is freely available for both commercial and non-commercial use and is distributed with source code under the [PSF License v2](https://github.com/jython/jython/blob/master/LICENSE.txt). Jython is complementary to Java and is especially suited for the following tasks:

 * Embedded scripting - Java programmers can add the Jython libraries to their system to allow end users to write simple or complicated scripts that add functionality to the application.
 * Interactive experimentation - Jython provides an interactive interpreter that can be used to interact with Java packages or with running Java applications. This allows programmers to experiment and debug any Java system using Jython.
 * Rapid application development - Python programs are typically 2-10x shorter than the equivalent Java program. This translates directly to increased programmer productivity. The seamless interaction between Python and Java allows developers to freely mix the two languages both during development and in shipping products.

##### Here is an example of running Python code inside a simple Java application
```java
import org.python.util.PythonInterpreter;

public class JythonHelloWorld {
  public static void main(String[] args) {
    try(PythonInterpreter pyInterp = new PythonInterpreter()) {
      pyInterp.exec("print('Hello Python World!')");
    }
  }
}
```
##### Here is an example of using Java from Python code
```python
from java.lang import System # Java import

print('Running on Java version: ' + System.getProperty('java.version'))
print('Unix time from Java: ' + str(System.currentTimeMillis()))
```

## Getting Started

 Ready to get started? Head over to [Downloads](download).

 Or you could read a quick overview of [features specific to Jython](jyspecific).

 A more detailed introduction and reference can be found in the [Jython Book]({{site.data.book.baseurl}}).



## Who uses Jython?
Jython is embedded in lots of projects. See some from [MVNRepository](https://mvnrepository.com/artifact/org.python/jython-standalone/usages)

- [IBM Websphere](https://www.ibm.com/developerworks/websphere/library/techarticles/1004_gibson/1004_gibson.html) - Use Jython to provide administrative scripting capabilities. 
- [Apache PIG](https://pig.apache.org/) - Use Jython to support user defined functions. 
- [ImageJ](http://imagej.net) - Use Jython to provide scripted image processing.
- [GDA](http://www.opengda.org/) - Use Jython to script scientific experiments.
- [Robot Framework](http://robotframework.org/) - A generic test automation framework for acceptance testing and acceptance test-driven development (ATDD) which runs on Jython.
- [TigerJython](http://jython.tobiaskohn.ch/) - An educational programming environment that is based on Jython.
- [JEM/JythonMusic](https://jythonmusic.me/) - An environment for music making and creative programming using Jython.

