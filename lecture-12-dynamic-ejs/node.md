## Need of dynamic UI

1. Personalized Content
2. Dynamic Data deliery
3. Scurity And access control
4. Localization and Internationalization
5. API Versatility

## Sharing using global variables

## what is EJS

1. HTML with JS:
2. Simple Syntex: Uses <% %> for control flow and <%= %> for output.
3. Easy To Learn:
4. Template Reuse:
5. Flexible Logic:

### After **EJS** install mut be **set** in root app js

```
app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));
```

### How to use EJS

```
userRouter.get("/", (req, res, next) => {
  console.log(homes);
  res.render("home", { homes: homes, title: "Home Page" });
});
```

```
<% homes.forEach(home => { %>
    <div class="bg-white p-4 rounded shadow">
    <h2 class="text-xl font-semibold mb-2"><%= home.name %></h2>
    <p class="text-gray-600 mb-1">Location: <%= home.address %></p>
    <p class="text-gray-600 mb-1">Price per Night: $<%= home.price %></p>
    </div>
<% }) %>
```
