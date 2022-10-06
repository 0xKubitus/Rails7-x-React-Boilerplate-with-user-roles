# How to use this repo?
<ol>
  <li>Clone me if needed;</li>
  <li>Delete config/credentials.yml.enc;</li>
  <li>Open project's folder in Terminal, and run the following commands:</li>
</ol>

```
rake secret
```

-> Copy the string (key) that you get.

```
EDITOR=nano rails credentials:edit
```
(will open a file in Nano editor)


=> Add at the bottom of the file:
```
devise:
  jwt_secret_key: [copied key] // ⚠ there are 2 spaces at the beginning of this line
```

Next step:

```
bundle install
rails db:create db:migrate
rails server
```

Your API should be running on port localhost:3001 ...

### ... which means you can now check the second folder, dealing with the frontend part of our future project!
