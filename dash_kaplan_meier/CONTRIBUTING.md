# Contributing to KaplanMeier Dash Component

Thank you for your interest in contributing! We welcome pull requests, bug reports, feature suggestions, and documentation improvements.

## Local Development

To develop the component locally:

### 1. Clone the Repository

```bash
git clone https://github.com/XLlobet/dash-kaplan-meier.git
cd dash-kaplan-meier/dash_kaplan_meier/
````

### 2. Install Dependencies

For the **JavaScript frontend**:

```bash
npm install
npm run start  # for development with hot reload
```

For the **Python wrapper**:

```bash
pip install -e .
```

### 3. Run the Demo

Edit `usage.py` or your own Dash app to try out changes.

---

## Testing

Before submitting a PR:

* Make sure the React component compiles with no errors.
* Test your changes using a Dash app.
* If you added new props or functionality, update the README accordingly.

## Submitting a Pull Request

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes with clear messages.
4. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on GitHub with a description of your changes.

## Guidelines

* Keep code style consistent with existing files.
* Favor clear, modular components.
* Add comments where necessary, especially for complex logic.
* For UI changes, test across browsers if possible.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

Thanks for helping improve this project!

```
