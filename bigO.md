# Big O Notation Cheat Sheet

> Updated: Jan 23, 2025
> Author: Navdeep Singh

Big O notation is a way to describe the time complexity of an algorithm. It is a measure of how the runtime of an algorithm grows as the input size grows. To learn more about Big O notation, check out the [Data Structures and Algorithms for Beginners](https://neetcode.io/courses/dsa-for-beginners/0) course.

It is important to note that Big O notation is a worst-case scenario. It is the maximum amount of time an algorithm will take to complete.

## O( 1 )

Constant time complexity. The runtime of the algorithm is constant and does not depend on the input size. For example, accessing an element in an array by its index is O(1) because it takes the same amount of time no matter how large the array is.

![](https://nc-gifs.pages.dev/constant.gif)

```python
# Array
nums = [1, 2, 3]
nums.append(4)    # push to end
nums.pop()        # pop from end
nums[0]           # lookup
nums[1]
nums[2]


# HashMap / Set
hashMap = {}
hashMap["key"] = 10     # insert
print("key" in hashMap) # lookup
print(hashMap["key"])   # lookup
hashMap.pop("key")      # remove
```

## O( n )

Linear time complexity. The runtime of the algorithm grows linearly with the input size. For example, iterating through an array of size n is O(n) because it takes the same amount of time no matter how large the array is.

![](https://nc-gifs.pages.dev/linear.gif)

```python
nums = [1, 2, 3]
sum(nums)           # sum of array
for n in nums:      # looping
    print(n)

nums.insert(1, 100) # insert middle
nums.remove(100)    # remove middle
print(100 in nums)  # search

import heapq
heapq.heapify(nums) # build heap

# sometimes even nested loops can be O(n)
# (e.g. monotonic stack or sliding window)
```

## O( n^2 )

Quadratic time complexity. The runtime of the algorithm grows quadratically with the input size. For example, iterating through an array of size n and then iterating through an array of size n again is O(n^2) because it takes n * n operations to complete.

Even if the inner loop does not run for the entire length of the outer loop, the time complexity is still O(n^2) because the outer loop runs n times and the inner loop runs proportionally to the length of the input array.

![](https://nc-gifs.pages.dev/n%20squared.gif)

```python
# Traverse a square grid
nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
for i in range(len(nums)):
    for j in range(len(nums[i])): 
        print(nums[i][j])


# Get every pair of elements in array
nums = [1, 2, 3]
for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
        print(nums[i], nums[j])

# Insertion sort (insert in middle n times -> n^2)
```

## O( n * m )

This is the time complexity of a nested loop where the inner loop runs m times for each iteration of the outer loop. For example, iterating through an array of size n and then iterating through an array of size m is O(n * m) because it takes n * m operations to complete.

![](https://nc-gifs.pages.dev/onm.gif)

```python
# Get every pair of elements from two arrays
nums1, nums2 = [1, 2, 3], [4, 5]
for i in range(len(nums1)):
    for j in range(len(nums2)):
        print(nums1[i], nums2[j])

# Traverse rectangle grid
nums = [[1, 2, 3], [4, 5, 6]]
for i in range(len(nums)):
    for j in range(len(nums[i])):
        print(nums[i][j])
```

## O( n^3 )

Cubic time complexity. The runtime of the algorithm grows cubically with the input size. For example, iterating through an array of size n and then iterating through an array of size n again and then iterating through an array of size n again is O(n^3) because it takes n * n * n operations to complete.

```python
# Get every triplet of elements in array
nums = [1, 2, 3]
for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
        for k in range(j + 1, len(nums)):
            print(nums[i], nums[j], nums[k])
```


## O( logn )

Logarithmic time complexity. The runtime of the algorithm grows logarithmically with the input size. For example, searching for an element in a sorted array is O(logn) because it takes the same amount of time no matter how large the array is.

![](https://nc-gifs.pages.dev/logn.gif)

```python
# Binary search
nums = [1, 2, 3, 4, 5]
target = 6
l, r = 0, len(nums) - 1
while l <= r:
    m = (l + r) // 2
    if target < nums[m]:
        r = m - 1
    elif target > nums[m]:
        l = m + 1
    else:
        print(m)
        break

# Binary Search on BST
def search(root, target):
    if not root:
        return False
    if target < root.val:
        return search(root.left, target)
    elif target > root.val:
        return search(root.right, target)
    else: 
        return True

# Heap Push and Pop
import heapq
minHeap = []
heapq.heappush(minHeap, 5)
heapq.heappop(minHeap)
```


## O( nlogn )

The runtime of the algorithm grows linearly with the input size and the logarithm of the input size. For example, sorting an array is O(nlogn) because it takes n operations to sort the array and logn operations to sort each element.

![](https://nc-gifs.pages.dev/nlogn.gif)

```python
# HeapSort
import heapq
nums = [1, 2, 3, 4, 5]
heapq.heapify(nums)     # O(n)
while nums:
    heapq.heappop(nums) # O(logn)

# MergeSort (and most built-in sorting functions)
```

## O( 2^n )

Exponential time complexity. The runtime of the algorithm grows exponentially with the input size. For example, generating all permutations of an array is O(2^n) because there are 2^n possible permutations.

![](https://nc-gifs.pages.dev/2%5En.gif)

```python
# Recursion, tree height n, two branches
def recursion(i, nums):
    if i == len(nums):
        return 0
    branch1 = recursion(i + 1, nums)
    branch2 = recursion(i + 2, nums)
```

## O( c^n )

Exponential time complexity. The runtime of the algorithm grows exponentially with the input size. For example, generating all permutations of an array is O(2^n) because there are 2^n possible permutations.

```python
# c branches, where c is sometimes n.
def recursion(i, nums, c):
    if i == len(nums):
        return 0
    
    for j in range(i, i + c):
        branch = recursion(j + 1, nums)
```

## O( n! )

Factorial time complexity. The runtime of the algorithm grows factorially with the input size. For example, generating all permutations of an array is O(n!) because there are n! possible permutations.

![](https://nc-gifs.pages.dev/n!.gif)

```python
# Permutations
def permute(nums):
    def backtrack(path, nums):
        if not nums:
            res.append(path)
            return
        for i in range(len(nums)):
            backtrack(path + [nums[i]], nums[:i] + nums[i + 1:])
    res = []
    backtrack([], nums)
    return res
```

## O( sqrt(n) )

Square root time complexity. The runtime of the algorithm grows as the square root of the input size. For example, finding all factors of a number is O(sqrt(n)) because there are sqrt(n) possible factors.

![](https://nc-gifs.pages.dev/sqrt(n).gif)

```python
# Get all factors of n
import math
n = 12
factors = set()
for i in range(1, int(math.sqrt(n)) + 1):
    if n % i == 0:
        factors.add(i)
        factors.add(n // i)
```
