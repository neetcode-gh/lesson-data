# 8 Design Patterns Every Programmer Should Know

## Creational Patterns

### Factory

```python
class Burger:
    def __init__(self, ingredients):
        self.ingredients = ingredients

    def print(self):
        print(self.ingredients)

class BurgerFactory:
    
    def createCheeseBurger(self):
        ingredients = ["bun", "cheese", "beef-patty"]
        return Burger(ingredients)
    
    def createDeluxeCheeseBurger(self):
        ingredients = ["bun", "tomatoe", "lettuce", "cheese", "beef-patty"]
        return Burger(ingredients)

    def createVeganBurger(self):
        ingredients = ["bun", "special-sauce", "veggie-patty"]
        return Burger(ingredients)

burgerFactory = BurgerFactory()
burgerFactory.createCheeseBurger().print()
burgerFactory.createDeluxeCheeseBurger().print()
burgerFactory.createVeganBurger().print()
```
Output
> `['bun', 'cheese', 'beef-patty']`
> 
> `['bun', 'tomatoe', 'lettuce', 'cheese', 'beef-patty']`
> 
> `['bun', 'special-sauce', 'veggie-patty']`

### Builder

```python
class Burger:
    def __init__(self):
        self.buns = None
        self.patty = None
        self.cheese = None

    def setBuns(self, bunStyle):
        self.buns = bunStyle
    
    def setPatty(self, pattyStyle):
        self.patty = pattyStyle
    
    def setCheese(self, cheeseStyle):
        self.cheese = cheeseStyle

class BurgerBuilder:
    def __init__(self):
        self.burger = Burger()

    def addBuns(self, bunStyle):
        self.burger.setBuns(bunStyle)
        return self
    
    def addPatty(self, pattyStyle):
        self.burger.setPatty(pattyStyle)
        return self
    
    def addCheese(self, cheeseStyle):
        self.burger.setCheese(cheeseStyle)
        return self  

    def build(self):
        return self.burger

burger = BurgerBuilder() \
            .addBuns("sesame") \
            .addPatty("fish-patty") \
            .addCheese("swiss cheese") \
            .build()
```

### Singleton

```python
class ApplicationState:
    instance = None

    def __init__(self):
        self.isLoggedIn = False

    @staticmethod
    def getAppState():
        if not ApplicationState.instance:  
            ApplicationState.instance = ApplicationState()
        return ApplicationState.instance

appState1 = ApplicationState.getAppState()
print(appState1.isLoggedIn)

appState2 = ApplicationState.getAppState()
appState1.isLoggedIn = True

print(appState1.isLoggedIn)
print(appState2.isLoggedIn)
```
Output
> `False`
> 
> `True` 
> 
> `True`

## Behavioural Patterns

### Observer / PubSub

It's common for different components of an app to respond to events or state changes, but how can we communicate these events?
The Observer pattern is a popular solution. We have a Subject (aka Publisher) which will be the source of events. And we could have multiple Observers (aka Subscribers) which will recieve events from the Subject in realtime.

```python
class YoutubeChannel:
    def __init__(self, name):
        self.name = name
        self.subscribers = []

    def subscribe(self, sub):
        self.subscribers.append(sub)
    
    def notify(self, event):
        for sub in self.subscribers:
            sub.sendNotification(self.name, event)

from abc import ABC, abstractmethod

class YoutubeSubscriber(ABC):
    @abstractmethod
    def sendNotification(self, event):
        pass

class YoutubeUser(YoutubeSubscriber):
    def __init__(self, name):
        self.name = name
    
    def sendNotification(self, channel, event):
        print(f"User {self.name} received notification from {channel}: {event}")

channel = YoutubeChannel("neetcode")

channel.subscribe(YoutubeUser("sub1"))
channel.subscribe(YoutubeUser("sub2"))
channel.subscribe(YoutubeUser("sub3"))

channel.notify("A new video released")
```
In this case we have multiple Subscribers listening to a single published. But users could also be subscribed to multiple channels. 
Since the Publishers & Subscribers don't have to worry about each others' implementations, they are loosely coupled.

> `User sub1 received notification from neetcode: A new video released`
> 
> `User sub2 received notification from neetcode: A new video released`
> 
> `User sub3 received notification from neetcode: A new video released`

### Iterator

Many objects in python have built-in iterators. That's why we can conveniently iterate through an array using the key word `in`.
```python
myList = [1, 2, 3]
for n in myList:
    print(n)
```

Output
> `1`
> 
> `2` 
> 
> `3`

For more complex objects, like Linked Lists or Binary Search Trees, we can define our own iterators.

```python
class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self, head):
        self.head = head
        self.cur = None

    # Define Iterator
    def __iter__(self):
        self.cur = self.head
        return self

    # Iterate
    def __next__(self):
        if self.cur:
            val = self.cur.val
            self.cur = self.cur.next
            return val
        else:
            raise StopIteration

# Initialize LinkedList
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
myList = LinkedList(head)

# Iterate through LinkedList
for n in myList:
    print(n) 
```

Output
> `1`
> 
> `2` 
> 
> `3`

### Strategy

A Class may have different behaviour, or invoke a different method based on something we define (i.e. a Strategy). For example, we can filter an array by removing positive values; or we could filter it by removing all odd values. These are two filtering strategies we could implement, but we could add many more.

```python
from abc import ABC, abstractmethod

class FilterStrategy(ABC):

    @abstractmethod
    def removeValue(self, val):
        pass

class RemoveNegativeStrategy(FilterStrategy):

    def removeValue(self, val):
        return val < 0 

class RemoveOddStrategy(FilterStrategy):

    def removeValue(self, val):
        return abs(val) % 2


class Values:
    def __init__(self, vals):
        self.vals = vals
    
    def filter(self, strategy):
        res = []
        for n in self.vals:
            if not strategy.removeValue(n):
                res.append(n)
        return res

values = Values([-7, -4, -1, 0, 2, 6, 9])

print(values.filter(RemoveNegativeStrategy()))
print(values.filter(RemoveOddStrategy()))

```
Output
> `[0, 2, 6, 9]`
> 
> `[-4, 0, 2, 6]`

A common alternative to this pattern is to simply pass in an inline / lambda function, which allows us to extend the behaviour of a method or class.


## Structural Patterns

### Facade

According to Oxford Languages, a Facade is 
> an outward appearance that is maintained to conceal a less pleasant or creditable reality.

In the programming world, the "outward appearance" is the class or interface we interact with as programmers. And the "less pleasant reality" is the complexity that is hidden from us.
So a Facade, is simply a wrapper class that can be used to abstract lower-level details that we don't want to worry about.

```python
# Python arrays are dynamic by default, but this is an example of resizing.
class Array:
    def __init__(self):
        self.capacity = 2
        self.length = 0
        self.arr = [0] * 2 # Array of capacity = 2

    # Insert n in the last position of the array
    def pushback(self, n):
        if self.length == self.capacity:
            self.resize()
            
        # insert at next empty position
        self.arr[self.length] = n
        self.length += 1

    def resize(self):
        # Create new array of double capacity
        self.capacity = 2 * self.capacity
        newArr = [0] * self.capacity 
        
        # Copy elements to newArr
        for i in range(self.length):
            newArr[i] = self.arr[i]
        self.arr = newArr
        
    # Remove the last element in the array
    def popback(self):
        if self.length > 0:
            self.length -= 1 
```

### Adapter

Adapters allow incompatible objects to be used together. Following the Open-Closed principle, we can extend class behaviour without modifying the class itself.
If a `MicroUsbCable` class is initially incompatible with `UsbPort`, we can create a wrapper class (i.e. an Adapter), which makes them compatible. In this case, a `MicroToUsbAdapter` makes them compatible, similar to how we use adapters in the real-world.

```python
class UsbCable:
    def __init__(self):
        self.isPlugged = False
    
    def plugUsb(self):
        self.isPlugged = True

class UsbPort:
    def __init__(self):
        self.portAvailable = True
    
    def plug(self, usb):
        if self.portAvailable:
            usb.plugUsb()
            self.portAvailable = False

# UsbCables can plug directly into Usb ports
usbCable = UsbCable()
usbPort1 = UsbPort()
usbPort1.plug(usbCable)

class MicroUsbCable:
    def __init__(self):
        self.isPlugged = False
    
    def plugMicroUsb(self):
        self.isPlugged = True

class MicroToUsbAdapter(UsbCable):
    def __init__(self, microUsbCable):
        self.microUsbCable = microUsbCable
        self.microUsbCable.plugMicroUsb()

    # can override UsbCable.plugUsb() if needed

# MicroUsbCables can plug into Usb ports via an adapter
microToUsbAdapter = MicroToUsbAdapter(MicroUsbCable())
usbPort2 = UsbPort()
usbPort2.plug(microToUsbAdapter)
```
