---
title: Jython 3 Roadmap
---
# Jython 3 Roadmap

This discussion document attempts to outline the steps to Jython 3,
defined by the MVP Features.
There are probably glaring omissions.
It is deliberately without dates.

Apart from delivering the features,
it aims to satisfy certain voluntary constraints,
perceived as healthy in the long-term:

* Comprehensible and documented architecture.
  * Accessible for contribution.
  * Readable as a model implementation of Python.
* History is continuous with earlier contributed work, in spite of:
  * Radical code re-organisation.
  * Radical change (to some code).
  * Rendering some code broken or dead (temporarily).

In the interests of the second of these objectives (history),
in the following,
where it is implied we implement some class or package,
the default approach will be to build on and credit prior art.
To achieve this for each source file,
we git-move, (commit) and afterwards modify
the closest corresponding Jython 2 file.

The middle commit will often produce a version that does not build,
and should not be pushed to the project repository as the tip.
Subsequent editing and another commit will correct that.
Dead code,
normally a Bad Thing,
should remain until we know we won't resurrect it
to supply a later feature.
It may be necessary to create stubs to satisfy references in
un-resurrected code.


## A Sketchy Plan

### Scorched Earth

1. Restructure the code base so it builds with Gradle.
Legacy code stays where it is,
waiting to be moved and modified.

1. The first build target is a library `jython-3.8a1`,
but initially it will be empty.

1. Provide some basic landmarks (modular project structure)
and a convention for controlling log messages by sub-system.
(It's a debugging aid for us and information for production use.)

### Type and Arithmetic

1. Outline architecture for objects, types, operations, slots.
Specify the abstract object API (analogous CPython's).

1. Implement `PyBaseObject`, `PyType`,
and some simple types (mostly without operations).
Implement only the Java API and write JUnit tests
for type construction and inheritance.

1. Implement type slots, add slot functions to simple types,
and implement an abstract object API.
Test the whole via JUnit, calling the abstract object API.
From here on, new operations added imply
new abstract object API and JUnit tests to match.

1. Validation that acceptable performance is achieved,
invoking arithmetic operations through the API.
Likely to be measured using micro-benchmarks,
built as an application over the library.
Parity in the performance of `add(a, b)`
with CPython `a+b` is acceptable performance.
(A range of operations is intended, not just `+`.)
The micro-benchmark suite should grow as features are added.

### Interpreters and Threads

1. Outline architecture for interpreters, frames and the thread model.

1. `Interpreter`, `PyFrame` and `PyCode` supporting
execution of initial subset of CPython byte code.
From here on,
addition of a new feature includes corresponding additions
to the repertoire of the byte code interpreter,
in order to accept code that uses it. 

1. The means to read a code object output by CPython.
May be just a provisional mechanism,
or a partial implementation of `pickle`.

1. `PyJavaFunction` and `PyJavaModule` (but not `import` yet).

1. Rudimentary form of `builtins`.
Subsequently, objects added as needed.

1. Micro-benchmarks that execute the compiled form of Python fragments
in the compatible Jython `PyFrame`.
Target is parity with CPython `timeit` results on the same fragment.
Code and reference generated from a string.
(Is a framework possible to make this ever-expanding suite least work?)
 
1. Micro-benchmarks validating parity with CPython `f(args, kwargs)`,
over a variety of argument patterns `f()`, `f(x)`, ``f(x, k=1)``, etc..

1. Validation of correct operation with concurrent threads,
especially that types do not escape incomplete from construction.
This suite should grow as features are added
that carry a risk of incorrect concurrency.

### Descriptor Protocol

1. Further architecture of the object model,
aiming for a complete description of types defined in Python or Java
and of multiple inheritance.

1. Implementation of classes defined in Python.

1. Descriptor protocol and mechanisms to populate
the PyType dictionary from classes.
Test via JUnit (directly or via the abstract object API).

1. Definition of classes, members and methods using annotations in Java.
(Something like the Jython 2 exposer but less opaque, documented,
and simplified using `MethodHandle`.)

### Experiment with Object

Consider the advantages to performance,
and the transparency of Java integration,
of making every `Object` a Python object.
Explore the idea of "acceptable implementations"
of common built-in types to allow e.g. `String` to be a `str`.
Experiment with ``CallSite`` as a consumer of the `MethodHandle`
already in slots.

Resolve the `PyObject` vs `Object` dilemma.

### Java Integration

Approach to and basic implementation of
treating Java objects as Python objects,
having a Python type related to their Java class,
when they have not been specifically identified (built-ins).
Performance micro-benchmarks modelling code compiled to Java. 

### Module Import

1. Outline architecture for modules and importers,
giving special attention to the semantics of Java packages and modules.
Advances in the module concept in Python should allow us
to avoid some of the special cases and thrashing around we find in Jython 2.

1. Rudimentary forms of `sys`, `io`.
Subsequently, objects to be added as needed.

1. Implement impolrt mechanism closely following CPython.

1. Use custom finders (probably) to import objects from Java.


### Compiler

1. Further selected `stdlib` modules as necessary in the compiler.

1. AST classes generated from Python ASDL.
Generated classes are Python objects in an `ast` module.
(Question: should they be generated in Java? With ANTLR?)

1. Compiler from Python source to AST,
probably using the PEG parser.
(If using PEG, compile with CPython and run with Jython.)

1. Compiler from AST to CPython byte code:
using the version in Python if possible (compiled with CPython),
otherwise follow CPython implementation in Java.
(There is no CPython byte code compiler in Jython 2 legacy.)

### Jython Command

1. Jython 3 console command as a Java application
built over the library.

1. Means to invoke Jython on all major OSes.

### Python `stdlib`

Progressively introduce the `stdlib` and its regression test suite.

The CPython regression test suite is hugely useful
for driving our conformance and completeness,
but the test process itself relies on a large proportion
of the language and `stdlib` working already.

## Implementation Notes

A few principles, some drawn from discussions on `jython-dev` or off-list.

* Adopt or write a higher proportion of modules in Python vs Java,
  than is the case in Jython 2.
  (Decent but not high performance interpreter is a pre-requisite.)
  * Only performance-critical modules are hand-crafted in Java.
  * Modules that take advantage of Java libraries call them from Python.
  * Enthusiasm for writing in Java should be directed to re-implementing
    popular libraries that broaden Jython use (`numpy`, etc.).

* Use fewer external JARs than in Jython 2.
  * Purpose of each JAR should be documented in the build.
  * Avoid libraries that circumvent the JVM:
    * Incompatibility in dealing strings and i/o has been expensive.
    * Many bugs related to `jnr.posix`. (Replace with `java.nio.file`?)
    * Carefully consider what `os.*` methods we offer and their semantics.
    * Reconsider `jnr.jffi`. (Remove related `ctypes` support.)

* Use the dynamic language features (at last) starting with `MethodHandle`.
  * A core implementation closer to modern CPython.
  * MVP: `MethodHandle` used to fill type slots (concept proven).
  * When compiling to JVM byte code, create call sites using the same
    or a related `MethodHandle`.

* Use a PEG parser following GvR's lead.
  * Gives us a lot for free (but not a whole compiler).
  * MVP: Still need a Lexer. (ANTLR?)
  * MVP: Generate the AST classes from ASDL. (Python or ANTLR?)
  * MVP: Compiler from AST to Python byte code. (Available in Python?)
  * Compiler from AST to Java byte code. (Ours to write/update.)

* Use the six module during development with a view to ensuring our
  users can migrate using it. (Suggestion needs exploration.)


## Build environment

All this ought to be followed from the start
in order to maintain acceptable quality (which is MVP).

* The project is homed at GitHub, where 3.8 is a branch.

* We follow CPython processes
  * Jython dev guide should reflect these processes
  * Accepting integrations like as miss-islington may not be available.

* Build with Gradle
  * multi-project, e.g.: `core`, `compiler`, `lib`, `apps` sub-projects.
  * composite project, with (say) `tools` for our build-time use only.

* Build depends on CPython of the target version.
  * Likely to need for code-generation
    * as a processor with or instead of StringTemplate
    * to generate CPython byte code (part of deliverable)
  * Reference for performance microbenchmarks.
  * Reference for test results (maybe just for the programmer).
  * Delivered (MVP) does not require CPython to install or run.

* Test at multiple layers routinely
  * JUnit tests for core elements in isolation (per build/commit).
  * `regrtest` test of integrated interpreter (before commit).
  * Test parsing at the REPL simulated somehow (before merge).
    * This is a shared need with CPython.
  * Test what the user actually installs: JAR and application (before merge).
  * Test typical user integrations (before merge).


## Some roads not to be taken

* **Not:** Build directly on the `jython/jython3` repo.
  * It reproduced the Jython 2 object model. We'd like to move on.
  * It has never pulled any bug-fixes from the trunk,
    and we judge the merge to be too difficult.
  * It is desirable to acknowledge the work somehow, and to pull in some
    content, perhaps converted modules, if this is efficient.
  * We should make clear on `jython/Jython3` that it is not Jython 3.
    * Reports of project death continually appear there.
    * They are of course greatly exaggerated.

* **Not:** Bend the use of Gradle to a file structure conceived for Ant.
  * The existing Gradle build works this way and it was *hard work*.
  * Git is capable of tracing the ancestry of files that have moved.

* **Not:** Start from scratch.
  * The Jython 2 code base contains a huge amount:
    * solutions to problems we haven't even recognised in Jython 3.
    * design choices (although mostly free of rationale).
  * We'd like to trace our history back to early contributors.
  * Downside: for an appreciable time, we shall have legacy code
    in `/src` that is waiting to be incorporated.
