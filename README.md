# Welcome to a new Jython website
The site is currently in development so expect some broken links etc.

# What is Jython?
Jython is a [Java](https://go.java/index.html) implementation of [Python](https://www.python.org/) that combines expressive power with clarity. Jython is freely available for both commercial and non-commercial use and is distributed with source code under the [PSF License v2](https://github.com/jythontools/jython/blob/master/LICENSE.txt). Jython is complementary to Java and is especially suited for the following tasks:

 * Embedded scripting - Java programmers can add the Jython libraries to their system to allow end users to write simple or complicated scripts that add functionality to the application.
 * Interactive experimentation - Jython provides an interactive interpreter that can be used to interact with Java packages or with running Java applications. This allows programmers to experiment and debug any Java system using Jython.
 * Rapid application development - Python programs are typically 2-10x shorter than the equivalent Java program. This translates directly to increased programmer productivity. The seamless interaction between Python and Java allows developers to freely mix the two languages both during development and in shipping products.

Here is an example of running Python code inside simple Java app.
```java
import org.python.util.PythonInterpreter;

public class JythonHelloWorld {
  public static void main(String[] args) {
    try(PythonInterpreter pyInterp = new PythonInterpreter()) {
      pyInterp.exec("print 'Hello Python World!'");
    }
  }
}
```
 Ready to get started? Head over to [Downloads](download)
