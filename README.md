
# Node Calculator for CLI

### Application can be run via the following command
`sh run.sh`

Be sure that you have [node](https://nodejs.org/en/) installed on your system

### You should see a prompt that looks like:

```
$ sh run.sh 
> 
```

### Availble functions

All basic 4 mathematical functions are supported:

```
> 5 * 5
25
```

```
> (5 + 5) * 5
50
```

Exponentiation is supported with `**`:

```
> 5 * 5**5
15625
```

Variables are supported, but names must be lowercase.

```
> x = 5
5
> x + 5
10
```
Some functional calls are also supported, althoghthis is dependant on js math processor 

```
> sin(5)
-0.9589242746631385
```


```
> pow(5*5,1+1)
=> 625
```

To exit, simply run ctrl+C, then verify that you wish to exit the application

```
$ ctrl+C
=> Exit (y or n)? y(es)
```
