# 5 Most Important Graph Algorithms

> Updated: Jan 22, 2025
> Author: Navdeep Singh

Graphs are an extremely common question type in coding interviews, mainly because a graph is an abstract concept, rather than a data structure stored in memory. From highway networks to LinkedIn connections, and even file directories, can be represented as graphs.
I've combined a list of 5 common graph algorithms that will be helpful to you in coding interviews.

## 1. Depth First Search (DFS)

Prioritizes depth first. This search will go as deep as possible exploring each node before hitting the base case, after which it explores other nodes. A hash set is used to keep track of visited nodes.

![](https://nc-gifs.pages.dev/dfs.gif)

[Learn more about DFS](https://neetcode.io/courses/dsa-for-beginners/29)

## 2. Breadth First Search (BFS)

Prioritizes breadth first. It explores all possible neighbors of a vertex before moving on to the next level of neighbors, sometimes also called layers. This uses a queue and a hash set, and can be used to find the length of the shortest path from one vertex to the other.

![](https://nc-gifs.pages.dev/bfs.gif)

[Learn more about BFS](https://neetcode.io/courses/dsa-for-beginners/30)

## 3. Union-Find

Used to combine disjoint sets. It's useful for when we want to know the number of connected components in a graph. It's also used in Kruskal's algorithm for detecting cycles.

![](https://nc-gifs.pages.dev/union-find.gif)

[Learn more about Union-Find](https://neetcode.io/courses/advanced-algorithms/7)

## 4. Topological Sort

Implemented on a directed acyclic graph, it's used to order vertices such that for every directed edge u -> v, vertex u appears before vertex v. This is useful if an interview problem talks about pre-requisites where one condition must be fulfilled before moving on to the next. 

![](https://nc-gifs.pages.dev/topological.gif)

[Learn more about Topological Sort](https://neetcode.io/courses/advanced-algorithms/17)

## 5. Dijkstra's Algorithm

A greedy algorithm that operates on weighted graphs, used to find the shortest path from one source to all other vertices in the graph. It uses a min heap to pick the shortest path at each step and a hash set to avoid cycles.

![](https://nc-gifs.pages.dev/dijkstra.gif)

[Learn more about Dijkstra's Algorithm](https://neetcode.io/courses/advanced-algorithms/14)
