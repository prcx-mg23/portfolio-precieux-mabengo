import os

pk  = os.environ["PUBLIC_KEY"].strip()
sid = os.environ["SERVICE_ID"].strip()
tid = os.environ["TEMPLATE_ID"].strip()

js = (
    "const EMAILJS_PUBLIC_KEY  = '" + pk  + "';\n"
    "const EMAILJS_SERVICE_ID  = '" + sid + "';\n"
    "const EMAILJS_TEMPLATE_ID = '" + tid + "';\n"
    "\n"
    "emailjs.init(EMAILJS_PUBLIC_KEY);\n"
    "\n"
    "function sendEmail() {\n"
    "  const status = document.getElementById('form-status');\n"
    "  const params = {\n"
    "    from_name: document.getElementById('from_name').value,\n"
    "    reply_to:  document.getElementById('reply_to').value,\n"
    "    subject:   document.getElementById('subject').value,\n"
    "    message:   document.getElementById('message').value,\n"
    "  };\n"
    "  if (!params.from_name || !params.reply_to || !params.subject || !params.message) {\n"
    "    status.textContent = '> Erreur : veuillez remplir tous les champs.';\n"
    "    status.className = 'form-status error';\n"
    "    return;\n"
    "  }\n"
    "  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)\n"
    "    .then(() => {\n"
    "      status.textContent = '> Message envoyé avec succès. Je vous répondrai rapidement.';\n"
    "      status.className = 'form-status success';\n"
    "      document.getElementById('from_name').value = '';\n"
    "      document.getElementById('reply_to').value  = '';\n"
    "      document.getElementById('subject').value   = '';\n"
    "      document.getElementById('message').value   = '';\n"
    "    })\n"
    "    .catch((err) => {\n"
    "      status.textContent = '> Erreur : ' + (err.text || 'Vérifiez vos clés.');\n"
    "      status.className = 'form-status error';\n"
    "    });\n"
    "}\n"
)

os.makedirs("src/JavaScript", exist_ok=True)
with open("src/JavaScript/emailjs.config.js", "w") as f:
    f.write(js)

print("emailjs.config.js généré avec succès.")