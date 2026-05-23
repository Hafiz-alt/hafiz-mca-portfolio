# Hafiz's MCA Portfolio

A personal portfolio website for Hafiz Muhammed P H, presenting full-stack and AI/ML projects, technical skills, contact information, and a downloadable resume.

## Tech Stack

- Flask
- HTML5
- CSS3
- JavaScript
- Gunicorn

## Project Structure

```text
hafiz_portfolio/
|-- app.py
|-- Procfile
|-- requirements.txt
|-- static/
|   |-- css/
|   |-- docs/
|   |-- images/
|   `-- js/
`-- templates/
    `-- index.html
```

## Local Development

1. Clone the repository and move into the project directory:

   ```bash
   git clone https://github.com/Hafiz-alt/hafiz-mca-portfolio.git
   cd hafiz-mca-portfolio
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv .venv
   ```

   On Windows PowerShell:

   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

   On macOS or Linux:

   ```bash
   source .venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the application locally:

   ```bash
   flask --app app run --debug
   ```

5. Open the local development site at `http://127.0.0.1:5000/`.

## Production Server

The application exposes the Flask WSGI instance as `app` in `app.py`. It can be served with Gunicorn:

```bash
gunicorn app:app
```

## Contact Form

The contact form uses FormSubmit to forward portfolio enquiries to the portfolio email address without requiring an application database or mail server.

After the site is published, submit the form once and open the FormSubmit activation email sent to `hafizmdph88172@gmail.com`. Once confirmed, subsequent portfolio enquiries will be delivered to that inbox.

## Deploying On Render

Create a new **Web Service** in Render and connect this GitHub repository.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Hafiz-alt/hafiz-mca-portfolio)

Use the following service settings:

| Setting | Value |
| --- | --- |
| Runtime | Python 3 |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `gunicorn app:app` |

The repository also contains a `Procfile` with the production start command:

```procfile
web: gunicorn app:app
```

The included `render.yaml` Blueprint defines the same Python web service on Render's free instance type with automatic deploys from future commits.

Note that Render free web services spin down after periods without inbound traffic, so the first visit after inactivity can take extra time to load.

## Author

Hafiz Muhammed P H  
Full Stack & AI/ML Developer  
GitHub: [Hafiz-alt](https://github.com/Hafiz-alt)
