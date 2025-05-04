# Data Structures and Algorithms Glossary (for Coding Interviews)


This article includes the most common terms you will encounter in DSA interviews.

Knowing and understanding these beforehand can save you a significant amount of time when solving problems in live interviews.


## Arrays & Strings

| Term | Definition |
|------|------------|
| Subarray | A contiguous portion of an array |
| Subsequence | A sequence derived by deleting elements without changing their order |
| Monotonic | Elements are entirely non-decreasing or non-increasing |
| Circular Array | Array where the end connects to the beginning |
| Partition | Dividing array into parts based on specific criteria |
| Kadane's Algorithm | Technique to find maximum sum subarray |
| Two Pointers | Using two index pointers to solve array problems |
| Sliding Window | Technique of maintaining a window that slides through an array |
| Prefix Sum | Array where each element is sum of all previous elements |
| Suffix Sum | Array where each element is sum of all elements after it |
| Rotation | Shifting array elements by a certain offset |
| In-place | Algorithm that transforms input without creating another data structure |
| Anagram | A string formed by rearranging the characters from another |
| Lexicographic Order | Dictionary ordering of strings |

## Trees

| Term | Definition |
|------|------------|
| Binary Tree | Tree where each node has at most two children |
| BST (Binary Search Tree) | Binary tree where left child < parent < right child |
| Complete Binary Tree | Every level filled except possibly last, which is filled left to right |
| Perfect Binary Tree | All internal nodes have exactly two children and all leaf nodes are at same level |
| Balanced Tree | Height difference between left and right subtrees is limited (often ≤1) |
| Self-Balancing Tree | Automatically maintains balance after insertions/deletions (e.g., AVL, Red-Black) |
| Traversal | Methods to visit all nodes (preorder, inorder, postorder, level-order) |
| Lowest Common Ancestor (LCA) | Deepest node that is an ancestor of two given nodes |
| Serialization/ Deserialization | Converting a tree to/from a string representation |
| Diameter | Longest path between any two nodes in a tree |
| Level Order | Processing tree nodes level by level |
| Segment Tree | Data structure for range queries |
| BFS | Traversing the tree level by level |
| DFS | Traversing the tree in a depth-first manner |

## Graphs

| Term | Definition |
|------|------------|
| Directed / Undirected | Edges with/without direction |
| Weighted / Unweighted | Edges with/without values - known as weights |
| Connected Component | Subset of vertices where any two vertices are connected by a path |
| Strongly Connected Component (SCC) | In a directed graph, subset where every vertex is reachable from every other |
| Bipartite Graph | Can be divided into two sets with no edges within each set |
| DAG (Directed Acyclic Graph) | Directed graph with no cycles |
| Topological Sort | Linear ordering of vertices where for every edge (u,v), u comes before v. Works with DAGs |
| Adjacency List | Graph representation derived from an array of edges |
| BFS/DFS | Breadth-First Search and Depth-First Search traversal strategies |
| MST (Minimum Spanning Tree) | Tree connecting all vertices with minimum total edge weight |
| Bellman-Ford/Dijkstra /Floyd-Warshall | Shortest path algorithms |
| Union-Find | Data structure for disjoint sets operations |
| Cycle Detection | Algorithms to find cycles in graphs |
| A* Algorithm | Best-first search algorithm for path finding |

## Dynamic Programming

| Term | Definition |
|------|------------|
| Memoization | Cache technique to avoid redundant calculations |
| Tabulation | Bottom-up approach using arrays to store subproblem results |
| State | Snapshot of progress you've made in solving the larger problem |
| Overlapping Subproblems | When the same subproblems are solved multiple times |
| 1-Dimensional | The result for the current state only depends on one previous state or a linear history, e.g. Fib |
| 2-Dimensional | The problem depends on two varying factors, often two strings, two sequences, or two indices |
| Top Down | Start from the final problem and recursively break it into smaller subproblems |
| Bottom Up | Build the solution from the base case all the way up to the final solution |
| Longest Common Subsequence (LCS) | Finding the longest subsequence common to two sequences |
| Longest Increasing Subsequence (LIS) | Finding the longest subsequence where elements are in ascending order |
| 0 / 1 Knapsack | Each item can be picked at most once |
| Unbounded Knapsack | Each item can be picked unlimited times |

## Heap & Priority Queue

| Term | Definition |
|------|------------|
| Min Heap / Max Heap | Tree-based data structure where parent is smaller/larger than children |
| Heap Sort | Sorting algorithm using a heap |
| Priority Queue | Abstract data type providing efficient access to the minimum/maximum element |
| Heapify | Process of creating a heap from an array |
| K-Way Merge | Merging k sorted arrays/lists (often using heaps) |
| Build Heap | The process of running heapify() on the entire heap to create a valid heap |
| Two Heaps | A technique used to find the median of a data stream using a max and a min heap |

## Backtracking

| Term | Definition |
|------|------------|
| Subsets | Set A is a subset to Set B if all of its elements are found in Set B |
| Combinations | Number of ways of selection and arrangement of items where order does not matter |
| Permutations | Number of ways of selection and arrangement of items where order matters |
| Pruning | Used to eliminate branches early on that can never lead to valid solutions |
| Constraint | A condition that must be satisfied to reach a valid solution |
| Base Case | Determines when a valid solution has been found |
| Candidate Solution | Start from the final problem and recursively break it into smaller subproblems |
| Unique Combination | Two combinations are unique if the frequency of chosen numbers is not the same |

## Miscellaneous

| Term | Definition |
|------|------------|
| Amortized Analysis | Analyzing average performance over a sequence of operations |
| Randomized Algorithm | Algorithm that uses random numbers to decide next step |
| Skip List | Probabilistic data structure for efficient search |
| Execution Time | The raw time taken in seconds to execute an algorithm |
| Stable Sorting Algorithm | A sorting algorithm that maintains the relative order of elements after sorting |
| Unstable Sorting Algorithm | A sorting algorithm that does not maintain the relative order of elements after sorting |
