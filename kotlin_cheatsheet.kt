// Here's a comprehensive Kotlin cheatsheet with comments explaining each feature or concept

// Kotlin Cheatsheet

// 1. Basics

// Defining variables
val readOnly: String = "Cannot be changed"  // Immutable variable
var mutable: String = "Can be changed"      // Mutable variable

// Type inference
val inferredType = 42  // Compiler infers Int type

// String interpolation
val name = "John"
val greeting = "Hello, $name"  // Embedding variables in strings

// Multiline strings
val multiline = """
    This is a multiline
    string.
"""

// 2. Functions

// Basic function
fun sum(a: Int, b: Int): Int {
    return a + b
}

// Single-expression function
fun multiply(a: Int, b: Int) = a * b

// Function with default arguments
fun greet(name: String = "World") {
    println("Hello, $name!")
}

// Named arguments
greet(name = "Alice")

// 3. Classes and Objects

// Class definition
class Person(val firstName: String, val lastName: String) {
    var age: Int = 0
}

// Creating an instance
val person = Person("John", "Doe")
person.age = 30

// Inheritance
open class Animal(val name: String) {
    open fun sound() {
        println("Animal sound")
    }
}

class Dog(name: String) : Animal(name) {
    override fun sound() {
        println("Bark")
    }
}

// 4. Control Flow

// If expression
val max = if (a > b) a else b

// When expression (similar to switch in other languages)
when (x) {
    1 -> println("x is 1")
    2 -> println("x is 2")
    else -> println("x is neither 1 nor 2")
}

// Ranges
for (i in 1..10) {  // Inclusive range
    println(i)
}

for (i in 1 until 10) {  // Exclusive range
    println(i)
}

// 5. Collections

// List
val list = listOf("a", "b", "c")
val mutableList = mutableListOf("a", "b", "c")

// Map
val map = mapOf("key1" to "value1", "key2" to "value2")
val mutableMap = mutableMapOf("key1" to "value1", "key2" to "value2")

// Set
val set = setOf("a", "b", "c")
val mutableSet = mutableSetOf("a", "b", "c")

// 6. Lambdas and Higher-Order Functions

// Lambda expression
val sumLambda: (Int, Int) -> Int = { x, y -> x + y }

// Higher-order function
fun calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

val result = calculate(5, 3, sumLambda)

// 7. Extension Functions

// Adding a new function to an existing class
fun String.reverse(): String {
    return this.reversed()
}

val reversed = "Kotlin".reverse()

// 8. Null Safety

// Nullable types
var nullableString: String? = "Can be null"
nullableString = null

// Safe call operator
val length = nullableString?.length

// Elvis operator
val lengthOrZero = nullableString?.length ?: 0

// Not-null assertion
val assuredLength = nullableString!!.length  // Throws NullPointerException if null

// 9. Data Classes

// Data class definition
data class User(val name: String, val age: Int)

// Copying data classes
val user1 = User("Alice", 25)
val user2 = user1.copy(age = 26)

// 10. Coroutines

// Coroutine basics
import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(1000L)
        println("World!")
    }
    println("Hello,")
}

// 11. Generics

// Generic class
class Box<T>(t: T) {
    var value = t
}

val intBox = Box(1)
val stringBox = Box("Hello")

// 12. Type Aliases

typealias StringList = List<String>
val stringList: StringList = listOf("a", "b", "c")

// 13. Sealed Classes

sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val exception: Exception) : Result()
}

fun handleResult(result: Result) {
    when (result) {
        is Result.Success -> println(result.data)
        is Result.Error -> println(result.exception)
    }
}

// 14. Singleton

object Singleton {
    var value: String = "I am a Singleton"
}

// 15. Delegation

class Example {
    var p: String by Delegate()
}

class Delegate {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
        return "$thisRef, thank you for delegating '${property.name}' to me!"
    }

    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
        println("$value has been assigned to '${property.name}' in $thisRef.")
    }
}

val example = Example()
example.p = "Delegated"
println(example.p)


// Kotlin smartly casts variables to the target type when it is safe to do so.
fun smartCastExample(x: Any) {
    if (x is String) {
        println(x.length)  // x is automatically cast to String
    }
}

// Companion objects are used to define static members of a class
class MyClass {
    companion object {
        fun create(): MyClass = MyClass()
    }
}

val instance = MyClass.create()


// Inlining functions can reduce the overhead of higher-order functions.
inline fun inlineExample(block: () -> Unit) {
    println("Before")
    block()
    println("After")
}

inlineExample {
    println("Inside")
}

// Using is for type checking and as for casting.
val obj: Any = "Hello"

if (obj is String) {
    println(obj.length)  // Smart cast to String
}

val casted = obj as String
println(casted.length)

// Kotlin supports destructuring for many data types.
val (name, age) = User("Alice", 25)
println(name)  // Alice
println(age)   // 25

// For Maps
val map = mapOf("key1" to "value1", "key2" to "value2")
for ((key, value) in map) {
    println("$key -> $value")
}

// Lateinit is used for late initialization of variables.
lateinit var lateinitVar: String

fun initialize() {
    lateinitVar = "Initialized"
}

fun checkInitialized() {
    if (::lateinitVar.isInitialized) {
        println(lateinitVar)
    }
}

// Inline classes provide a way to wrap value types without additional overhead.
inline class InlineClass(val value: String)

val inlineInstance = InlineClass("Hello")
println(inlineInstance.value)

// Sealed interfaces work similarly to sealed classes.
sealed interface Operation

data class Add(val value: Int) : Operation
data class Subtract(val value: Int) : Operation

fun perform(op: Operation) = when(op) {
    is Add -> op.value
    is Subtract -> -op.value
}

// Function literals with receiver are a unique feature in Kotlin.
val sum: Int.(Int) -> Int = { other -> this + other }

val result = 1.sum(2)  // Calls the function literal
println(result)  // 3

// Kotlin allows property delegation with the by keyword.
import kotlin.properties.Delegates

class User {
    var name: String by Delegates.observable("<no name>") {
        prop, old, new ->
        println("$old -> $new")
    }
}

val user = User()
user.name = "first"  // Prints: <no name> -> first
user.name = "second" // Prints: first -> second


// Reflection is used to inspect or modify the program structure.
import kotlin.reflect.full.*

fun reflectExample() {
    val kClass = MyClass::class
    println(kClass.simpleName)  // MyClass
    kClass.members.forEach {
        println(it.name)
    }
}

// Kotlin supports declaration-site and use-site variance.
class Box<out T>(val value: T)

fun useBox(box: Box<Number>) {
    val item: Number = box.value  // Safe to read
}

val intBox: Box<Int> = Box(1)
useBox(intBox)  // Box<Int> can be used as Box<Number> due to covariance

// Contracts help the compiler understand certain behaviors of your functions.
import kotlin.contracts.*

fun require(condition: Boolean) {
    contract {
        returns() implies condition
    }
    if (!condition) {
        throw IllegalArgumentException("Condition failed")
    }
}

fun example(x: String?) {
    require(x != null)
    println(x.length)  // x is not null due to the contract
}

// Kotlin supports writing code that can run on multiple platforms.
expect fun platformName(): String

fun createApplicationScreenMessage(): String {
    return "Hello from ${platformName()}"
}

actual fun platformName(): String {
    return "JVM"
}

// You can define custom behavior for operators.
data class Point(val x: Int, val y: Int) {
    operator fun plus(other: Point) = Point(x + other.x, y + other.y)
}

val p1 = Point(1, 2)
val p2 = Point(3, 4)
val p3 = p1 + p2  // Uses the plus operator


