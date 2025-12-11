# Infinite Scroll

The goal of this is to create a generic Infinite scroll component such that it can be used else where.

[JSCAFEREF](https://www.youtube.com/watch?v=v_fwMoTVmqw&list=PLe3J6mZBq1xUs529Z-IHiCix4KBm0uLp1&index=1&pp=iAQB)
[DAVEGRAY](https://www.youtube.com/watch?v=JWlOcDus_rs)

# 🔥 Some concepts:

### Why using useCallback ?

let's suppose we are passing a function to a component - what will happen
so if the parent gets rerendered , so the functions that are not using useCallback will get
recreated freshly in the memory & say that function is passed to some child component, then that child
component will also get rerendered. To avoid this unnecessary rerendering, we can use useCallback.

### What is Intersection Api?

Inserction Observer Api - browser api to find out when an element comes into the viewport of parent element or the bowser window
[BLOG](https://blog.webdevsimplified.com/2022-01/intersection-observer/)

### What is Pagination?

For developing a infinite scroll website we need to use an api which has support for pagination
