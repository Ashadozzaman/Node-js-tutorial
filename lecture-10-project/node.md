## Middelware

```
app.use((req, res, next) => {
  console.log("Middleware 1", req.url, req.method);
  next();
});
```

1. Order Matter
2. can not call next() after snd()
3. "/" match everything
4. calling **res.send** implicityy call **res.end()**.
