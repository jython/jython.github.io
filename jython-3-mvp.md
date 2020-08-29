---
title: Jython 3 MVP
---
# Minimum Viable Jython 3

This is a discussion document that attempts to describe,
and to some extent prioritise,
features for Jython 3,
based on suggestions collated from various voices on jython-dev
and in off-list e-mail.


## Positioning

We think people will continue to adopt and use Jython if Jython 3 ...

* is a modern version of Python, close to standard in its features.
* runs on a Java platform that is supported in the long-term.
* integrates cleanly with Java for access to JDK and user libraries.
* offers correct concurrency (effectively utilising available CPUs).
* allows code developed on CPython 3.x to run on Jython 3.x.
* is well-tested for release and supported for bugs.

The minimum viable product (MVP) is to approach *all* these targets closely,
that is, it isn't viable if it falls a long way short of any one of them.
This does not preclude the availability of immature alpha versions.
(It's a public project, so it is there for anyone to build.)


## Version and Forms

* MVP: A Python 3.8 (?) close to standard in ability to run Python.
  * Only essential differences (e.g. around GC, atomicity).
  * The full syntax (plus some Java twists e.g. to import from Java).
  * Close to the whole standard library (where use is not C-specific).

* Builds for Gradle/Maven ecosystem.
  * MVP: Slim JAR without bundled dependencies.
  * MVP: Centrally available to cite as a dependency.

* Provides an executable command
  * MVP: `jython3` command installable on each major OS
  * MVP: subset of commonly-used python3 command options
  * Option-compatible with `python3` (MVP: a subset)
  * Options specific to Jython (JVM options and others)


## Performance

* MVP: speed comparable with CPython (say 2x either way).
  * Higher performance (single-threaded) desirable but not MVP.
* Future: Work to improve speed.
  * Compile Python to JVM byte code.
  * Faster Python byte code interpreter.
* Have in mind performance for:
  * scientific computing
  * image, big data and ML libraries

These choices, if valid,
make a Python byte code interpreter a legitimate MVP.


## Platforms and Environments

It is difficult to enumerate the possibilities in a MECE way.
It is multidimensional, although not every combination makes sense.
Which of the things in this section are MVP?

### OS platforms:

* Windows desktop
* Linux desktop
* Raspberry Pi
* Android (minimum as discussed under "features")
  * Risk: API gaps constrain us, or lead to a special Android version
* Small JVM devices (e.g. for IoT)

### Runtime environments:

These are imprecise definitions, but the intention is to run everywhere
Java does, and take full advantage of each environment.

* Desktop
* J2EE
  * Risk: Java version support
* AWS
* Azure
* IoT/embedded Java

At the embedded end of the spectrum, Jython is probably only attractive if
Python is not available directly (and Java is, obviously).

### Significant Integrations

An unscientific, incomplete list based on projects we have noticed
(e.g. via a reported bug).

* Robot Framework
* ImageJ
* Pig
* Ghidra
* OpenHAB
* ... ?

There is a wider Python ecosystem that does not yet use Jython because they
depend on extensions in C. E.g. there is not much in SciPy without `numpy`.

How do we find the time and collaborators
to test integration into these environments?
Have we enough understanding to avoid unintentionally making it difficult?


## Features

* MVP: Runs on Java 11 SE. Chosen as a minimum because:
  * It is the post-Java 9 workhorse for the time being.
  * It has a rich set of libraries we can exploit in the implementation.
  * LTS version characterises many enterprise Java installations.
    * Enterprises favour security, ease of management.
  * Risk to MVP: J2EE is based on Java 8. Must explore:
    * have I misunderstood this?
    * non-issue if JVM byte code is the same?
    * attention needed to which libraries are on the path

* Not MVP: Runs on Android 8.0 API level 26:
  * Android 8.0 API level 26 is the first known to support `j.l.invoke`.
  * Constraint on run-time class creation precludes:
    * Compilation from Python to JVM byte code at run-time (`exec()`).
    * Certain approaches to implementation in detail.
  * Needs specialised tool chain.
  * Desirable target, but unknown other obstacles.

* MVP: Generate and consume CPython byte code:
  * This addresses large modules (JVM class size problem)
  * Makes it possible to adopt modules compiled by CPython (defined version)
  * Would be essential to Android support?

* MVP(?): Use of `threading` leads to actual concurrency.
  * There is no Global Interpreter Lock (neither a local one).
  * Built-in objects remain internally consistent under concurrent access.
  * The programmer is responsible for synchronisation of his/her code.
    * The value of a shared object seen by another thread may be stale:
    * Behavioural differences from CPython will occur in unsynchronised code.
  * Operations that [happen to be atomic in CPython](
    https://docs.python.org/3/faq/library.html#what-kinds-of-global-value-mutation-are-thread-safe
    ) need not be atomic in Jython.
  * Concurrency is close to a unique advantage: probably MVP.

* High standard of compatibility with CPython.
  * MVP: `os.name` no longer confuses popular tools (like `virtualenv`).
  * Divergences fixed as discovered. (Adoption of stdlib is a help.)

* Continue to integrate smoothly with Java
  * MVP: Generally works as in Jython 2.
  * Less magic: an object claiming Java type has the semantics in its Javadoc.
    * Avoid semantic confusion (e.g. `list.pop()` vs `Deque.pop()`)
    * Explicit cast or wrapper to choose Python semantics (possibly?)
    * No special treatment of Swing and AWT names (as now in `PyJavaType`).

* Support popular libraries (and their dependencies) progressively.
  * MVP: An API that makes extensions possible.
  * Encourage C to Java ports of the most popular (different projects!)
  * Encourage JyNI or HPy experiments.

* Compile Python source to Java byte code, and:
  * persist compiled Java byte code (in some form).
  * treat Python compiled to JVM as:
    * equivalent to cached .pyc files.
    * resources locatable in a JAR by Jython.
    * classes visible from Java (maybe).

* Command-line version.
  * MVP: Launch script or other wrapper. (Generated by `jlink`? C?)
  * The command you run *is* the interpreter, not a launcher.
    * JNI appears to [support this readily](
    https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/invocation.html
    ).
    * `sys.executable` designates the actual executable.
    * Process objects designate the process doing the work (not the wrapper).

* MVP: Interpreter embeddable in a Java application.
  * Continue JSR-223 support with some clean-up.
  * `PythonInterpreter` API (only) generally similar to Jython 2.
  * Risk: current API is unbounded: too much is public.
    * Reduce the public API aided by Java Jigsaw modules.
    * There will be blood.
  * Risk: much existing guidance invalidated (Jython Book).


## Implementation and API Features

The Java API available for embedding and to extension writers,
will be heavily influenced by "internal" implementation choices.
Looked at the other way, premature API choices may constrain implementation
freedom in undesirable ways.

This is especially true of the object model, since for efficiency's sake,
objects exchanged at the API will be in the implementations we use internally.

This can be less difficult than in CPython because Java gives us good
tools for encapsulation: interfaces, packages and modules.
(Modules are important here. Many implementation details in Jython 2
became public API, just to cross our own package boundaries.)

* MVP: Resolve the object API before 3.x beta. One of:
  * `PyObject` is an interface.
  * Every `j.l.Object` is a Python object directly.

* MVP: Abstract interface (along the lines of CPython `abstract.h`).
  * Abstract interface for basic operations.
  * The internals of `type` (slots, etc.) are private
    (better encapsulated than CPython).

* MVP: Clear relationships amongst interpreter, system state and
  thread state. (At least the interpreter and its semantics are API.)

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

All this feels like MVP in order to maintain acceptable quality.

* The project is homed at GitHub, where 3.8 is a branch.

* We follow CPython processes
  * Jython Devguide should reflect these processes
  * Accepting integrations like as miss-islington may not be available.

* Build with Gradle
  * multi-project, e.g.: `core`, `compiler`, `lib`, `apps` sub-projects.
  * composite project, with (say) `tools` for our build-time use only.

* Test at multiple layers routinely
  * JUnit tests for core elements in isolation (per build/commit).
  * `regrtest` test of integrated interpreter (before commit).
  * Test parsing at the REPL simulated somehow (before merge).
    * This is a shared need with CPython.
  * Test what the user actually installs: JAR and application (before merge).
  * Test typical user integrations (before merge).


## Some roads proposed not to taken

* **Not:** Java `List` and `Map` implicitly Python `list` and `map`.
  This is a tempting feature and it almost works,
  but involves complex guesswork.
  We need a brief way to be explicit instead.

* **Not:** Build to the above specification directly on the `jython/jython3`
  repo.
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
