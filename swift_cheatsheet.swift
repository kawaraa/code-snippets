// Here's a comprehensive Swift cheatsheet with comments explaining each feature or concept

// Swift Cheatsheet (Extended)

// 1. Basics

// Defining constants and variables
let constantString: String = "Cannot be changed" // Immutable constant
var variableString: String = "Can be changed"    // Mutable variable

// Type inference
let inferredType = 42 // Compiler infers Int type

// String interpolation
let name = "John"
let greeting = "Hello, \(name)" // Embedding variables in strings

// Multiline strings
let multiline = """
    This is a multiline
    string.
"""

// 2. Functions

// Basic function
func sum(a: Int, b: Int) -> Int {
    return a + b
}

// Function with default arguments
func greet(name: String = "World") {
    print("Hello, \(name)!")
}

// Function with named parameters
func greet(person name: String) {
    print("Hello, \(name)!")
}

greet(person: "Alice")

// Variadic parameters
func printAll(_ items: String...) {
    for item in items {
        print(item)
    }
}

printAll("one", "two", "three")

// 3. Closures

// Basic closure
let sumClosure: (Int, Int) -> Int = { (a: Int, b: Int) -> Int in
    return a + b
}

let result = sumClosure(5, 3)

// Trailing closure syntax
let numbers = [1, 2, 3, 4, 5]
let doubled = numbers.map { $0 * 2 }

// 4. Control Flow

// If statement
let number = 10
if number > 5 {
    print("Greater than 5")
} else {
    print("5 or less")
}

// Switch statement
let fruit = "apple"
switch fruit {
case "apple":
    print("An apple")
case "banana":
    print("A banana")
default:
    print("Unknown fruit")
}

// For loop
for i in 1...5 { // Inclusive range
    print(i)
}

// While loop
var count = 5
while count > 0 {
    print(count)
    count -= 1
}

// Repeat-while loop (similar to do-while)
repeat {
    print(count)
    count += 1
} while count < 5

// 5. Optionals

// Declaring optionals
var optionalString: String? = "Hello"
optionalString = nil

// Optional binding
if let unwrapped = optionalString {
    print(unwrapped)
} else {
    print("optionalString is nil")
}

// Optional chaining
let length = optionalString?.count

// Nil-coalescing operator
let lengthOrZero = optionalString?.count ?? 0

// 6. Collections

// Array
var array = ["a", "b", "c"]
array.append("d")
let firstElement = array[0]

// Dictionary
var dictionary = ["key1": "value1", "key2": "value2"]
dictionary["key3"] = "value3"
let value = dictionary["key1"]

// Set
var set: Set<String> = ["a", "b", "c"]
set.insert("d")
let containsA = set.contains("a")

// 7. Classes and Structs

// Class definition
class Person {
    var firstName: String
    var lastName: String
    
    init(firstName: String, lastName: String) {
        self.firstName = firstName
        self.lastName = lastName
    }
    
    func fullName() -> String {
        return "\(firstName) \(lastName)"
    }
}

let person = Person(firstName: "John", lastName: "Doe")
print(person.fullName())

// Struct definition
struct Point {
    var x: Int
    var y: Int
}

var point = Point(x: 1, y: 2)
point.x = 3

// 8. Enumerations

// Basic enum
enum Direction {
    case north
    case south
    case east
    case west
}

var direction = Direction.north
direction = .south

// Enum with associated values
enum Result {
    case success(data: String)
    case failure(error: String)
}

let resultSuccess = Result.success(data: "Data loaded")
let resultFailure = Result.failure(error: "Network error")

// 9. Protocols

// Protocol definition
protocol Greetable {
    func greet()
}

// Class conforming to protocol
class Greeter: Greetable {
    func greet() {
        print("Hello!")
    }
}

let greeter = Greeter()
greeter.greet()

// 10. Extensions

// Extension to add functionality to existing type
extension String {
    func reversed() -> String {
        return String(self.reversed())
    }
}

let reversed = "Swift".reversed()

// 11. Error Handling

// Defining an error type
enum FileError: Error {
    case notFound
    case unreadable
}

// Function that throws an error
func readFile(filename: String) throws {
    throw FileError.notFound
}

// Handling errors
do {
    try readFile(filename: "example.txt")
} catch FileError.notFound {
    print("File not found")
} catch {
    print("An error occurred: \(error)")
}

// 12. Generics

// Generic function
func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}

var a = 1
var b = 2
swapTwoValues(&a, &b)

// Generic class
class Box<T> {
    var value: T
    
    init(value: T) {
        self.value = value
    }
}

let intBox = Box(value: 123)
let stringBox = Box(value: "Hello")

// 13. Property Observers

class StepCounter {
    var steps: Int = 0 {
        willSet(newSteps) {
            print("About to set steps to \(newSteps)")
        }
        didSet {
            print("Added \(steps - oldValue) steps")
        }
    }
}

let stepCounter = StepCounter()
stepCounter.steps = 100

// 14. Type Aliases

typealias StringArray = [String]
let stringArray: StringArray = ["a", "b", "c"]

// 15. Closures as Completion Handlers

func fetchData(completion: @escaping (String) -> Void) {
    // Simulate network delay
    DispatchQueue.global().async {
        // Simulated data fetching
        let data = "Fetched data"
        completion(data)
    }
}

fetchData { data in
    print(data)
}

// 16. Access Control

// Public class
public class PublicClass {
    public var publicProperty = 0
    var internalProperty = 0  // Default internal access
    private var privateProperty = 0
}

let publicClass = PublicClass()
publicClass.publicProperty = 5

// 17. Lazy Properties

class DataLoader {
    lazy var data: String = {
        // Simulated data loading
        return "Loaded data"
    }()
}

let dataLoader = DataLoader()
print(dataLoader.data)

// 18. Singleton

class Singleton {
    static let shared = Singleton()
    private init() {}
    
    func doSomething() {
        print("Doing something")
    }
}

Singleton.shared.doSomething()

// 19. Delegation

protocol SomeDelegate {
    func didDoSomething()
}

class DelegateClass {
    var delegate: SomeDelegate?
    
    func doSomething() {
        // Do something
        delegate?.didDoSomething()
    }
}

class ImplementingClass: SomeDelegate {
    func didDoSomething() {
        print("Delegate did something")
    }
}

let delegateClass = DelegateClass()
let implementingClass = ImplementingClass()
delegateClass.delegate = implementingClass
delegateClass.doSomething()

// 20. Higher-Order Functions

let numbersArray = [1, 2, 3, 4, 5]
let evenNumbers = numbersArray.filter { $0 % 2 == 0 }
let doubledNumbers = numbersArray.map { $0 * 2 }
let sumOfNumbers = numbersArray.reduce(0, +)

// 21. Tuples

// Basic tuple
let tuple = (1, "One")
let (number, name) = tuple
print(number) // 1
print(name)   // One

// Named tuple
let namedTuple = (number: 1, name: "One")
print(namedTuple.number) // 1
print(namedTuple.name)   // One

// 22. Deinitializers

class MyClass {
    deinit {
        print("MyClass is being deinitialized")
    }
}

var myObject: MyClass? = MyClass()
myObject = nil // "MyClass is being deinitialized" will be printed

// 23. Subscripts

class SubscriptExample {
    var array = [1, 2, 3, 4, 5]
    
    subscript(index: Int) -> Int {
        get {
            return array[index]
        }
        set {
            array[index] = newValue
        }
    }
}

var subscriptExample = SubscriptExample()
print(subscriptExample[0]) // 1
subscriptExample[0] = 10
print(subscriptExample[0]) // 10

// 24. Nested Types

class OuterClass {
    class InnerClass {
        var innerProperty = "Inner"
    }
    
    var innerInstance = InnerClass()
}

let outer = OuterClass()
print(outer.innerInstance.innerProperty) // "Inner"

// 25. Key-Value Observing (KVO)

import Foundation

class KVOExample: NSObject {
    @objc dynamic var value: Int = 0
}

let kvoExample = KVOExample()
kvoExample.observe(\.value, options: [.new]) { example, change in
    print("Value changed to \(change.newValue!)")
}
kvoExample.value = 10 // "Value changed to 10" will be printed

// 26. Custom Operators

// Define a custom infix operator
infix operator ** : MultiplicationPrecedence

func ** (base: Int, power: Int) -> Int {
    return Int(pow(Double(base), Double(power)))
}

let result = 2 ** 3 // 8

// 27. Conditional Conformance

protocol ExampleProtocol {
    func exampleMethod()
}

extension Array: ExampleProtocol where Element: ExampleProtocol {
    func exampleMethod() {
        for element in self {
            element.exampleMethod()
        }
    }
}

struct ConformingType: ExampleProtocol {
    func exampleMethod() {
        print("Example method")
    }
}

let arrayOfConformingType = [ConformingType(), ConformingType()]
arrayOfConformingType.exampleMethod()

// 28. Codable Protocols

struct User: Codable {
    var name: String
    var age: Int
}

let user = User(name: "John", age: 30)
let jsonData = try! JSONEncoder().encode(user)
let jsonString = String(data: jsonData, encoding: .utf8)!
print(jsonString) // {"name":"John","age":30}

let decodedUser = try! JSONDecoder().decode(User.self, from: jsonData)
print(decodedUser.name) // "John"

// 29. Unsafe Operations

let intPointer = UnsafeMutablePointer<Int>.allocate(capacity: 1)
intPointer.pointee = 42
print(intPointer.pointee) // 42
intPointer.deallocate()

// 30. Concurrency with async/await

import _Concurrency

func fetchData() async -> String {
    // Simulate network delay
    await Task.sleep(2 * 1_000_000_000) // 2 seconds
    return "Fetched data"
}

Task {
    let data = await fetchData()
    print(data) // "Fetched data"
}

// 31. Memory Management and ARC (Automatic Reference Counting)

class ARCExample {
    var value: String
    
    init(value: String) {
        self.value = value
        print("\(value) is being initialized")
    }
    
    deinit {
        print("\(value) is being deinitialized")
    }
}

var obj1: ARCExample? = ARCExample(value: "Object 1")
var obj2: ARCExample? = obj1
obj1 = nil
obj2 = nil // "Object 1 is being deinitialized"

// 32. Result Type

func divide(_ a: Int, by b: Int) -> Result<Int, Error> {
    if b == 0 {
        return .failure(NSError(domain: "Division by zero", code: 1, userInfo: nil))
    } else {
        return .success(a / b)
    }
}

let divisionResult = divide(4, by: 2)
switch divisionResult {
case .success(let quotient):
    print("Quotient: \(quotient)")
case .failure(let error):
    print("Error: \(error.localizedDescription)")
}

// 33. Property Wrappers

@propertyWrapper
struct Capitalized {
    private var value: String = ""
    
    var wrappedValue: String {
        get { value }
        set { value = newValue.capitalized }
    }
}

struct User {
    @Capitalized var name: String
}

var user = User()
user.name = "john doe"
print(user.name) // "John Doe"

// 34. Pattern Matching

let someValue = 42
switch someValue {
case 0:
    print("Zero")
case 1...10:
    print("Between 1 and 10")
case let x where x % 2 == 0:
    print("Even number")
default:
    print("Some other value")
}
