---
title: Jython Registry
---

# Jython Registry

Because there is no good platform independent equivalent of the Windows Registry (or Unix envrionment variables) Java has its own environment variable namespace. Jython acquires its namespace from the following sources (later sources override defaults found in earlier places).

 - The Java system properties: typically passed in on the command line as options to the java interpreter.
 - The Jython "registry" file, which contains prop=value pairs. See below for the algorithm Jython uses to find the registry file.
 - The user's personal registry file, which contains similarly formated prop/value pairs. The user's registry file is at `"user.home"+"/.jython"`
 - Jython properties: Specified on the command line as options to the jython class. See the -D option to the interpreter.

## Registry Properties

The following properties are recognized by Jython. More detailed documentation may be found in comments in the `registry` file provided with the Jython distribution. 

**python.path**
Equivalent to CPython's `PYTHONPATH` environment variable

**python.cachedir**
The directory to use for caches - currently just package information. This directory must be writable by the user. If the directory is an absolute path, it is used as given, otherwise it is interpreted as relative to sys.prefix.

**python.verbose**
Sets the verbosity level for varying degrees of informative messages. Valid values in order of increasing verbosity are "error", "warning", "message", "comment", "debug"

**python.security.respectJavaAccessibility**
Normally, Jython can only provide access to public members of classes. If this property is set to false, and you are using a Java version before Java 9, then Jython can access non-public fields, methods, and constructors. This may be deprecated in the future due to Java changes to accessibility from version 9.

**python.console**
The name of a console class. An alternative console class that supports GNU readline can be installed with this property. Jython already include such a console class and it can be enabled by setting this property to `org.python.util.ReadlineConsole`.

**python.console.readlinelib**
Allow a choice of backing implementation for GNU readline support. Can be either GnuReadline or Editline. This property is only used when python.console is set to org.python.util.ReadlineConsole.

**python.startup**
File to be run at the start of each interactive session, but not when dropping in with the -i flag in after a script has run.

**python.modules.builtin**
Add, remove, or override built in modules.

**python.cpython2**
Command used to invoke CPython, when needed, as in the case of modules and methods longer than Java supports natively.




## Finding the Registry File

The following steps are used to find the Jython registry file, and also to set the Python values for `sys.prefix`. First a root directory is calculated:

 - If there is a property called `python.home`, this is used as the root directory.
 - Otherwise, the property `install.root` is used if it exists.
 - If neither of those properties exist, then Jython searches for the file "jython.jar" on the Java classpath, as defined in the system property `java.class.path`. The actual file system isn't searched, only the paths defined on the classpath (one of them must literally include "jython.jar").

Once the root directory is found, `sys.prefix` and `sys.exec_prefix` are set to this, and `sys.path` has rootdir/Lib appended to it. The registry file used is then rootdir/registry.

