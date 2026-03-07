/* 
   emailjs.config.js — Configuration EmailJS pour le formulaire

*/

const EMAILJS_PUBLIC_KEY  = 'x4fUqAnoKtLxJrkcA';  
const EMAILJS_SERVICE_ID  = 'service_qrvnbgr';   
const EMAILJS_TEMPLATE_ID = 'template_kav4st2';  

// Initialisation EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Fonction d'envoi appelée par le bouton du formulaire
function sendEmail() {
  const status = document.getElementById('form-status');

  const params = {
    from_name: document.getElementById('from_name').value,
    reply_to:  document.getElementById('reply_to').value,
    subject:   document.getElementById('subject').value,
    message:   document.getElementById('message').value,
  };

  // Validation des champs
  if (!params.from_name || !params.reply_to || !params.subject || !params.message) {
    status.textContent = '> Erreur : veuillez remplir tous les champs.';
    status.className = 'form-status error';
    return;
  }

  // Vérification que les clés ont bien été configurées
  if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    status.textContent = '> Config requise : remplacez les clés EmailJS dans emailjs.config.js';
    status.className = 'form-status error';
    return;
  }

  // Envoi du message
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
    .then(() => {
      status.textContent = '> Message envoyé avec succès. Je vous répondrai rapidement.';
      status.className = 'form-status success';
      // Réinitialisation du formulaire
      document.getElementById('from_name').value = '';
      document.getElementById('reply_to').value  = '';
      document.getElementById('subject').value   = '';
      document.getElementById('message').value   = '';
    })
    .catch((err) => {
      status.textContent = `> Erreur d'envoi : ${err.text || 'Vérifiez vos clés EmailJS.'}`;
      status.className = 'form-status error';
    });
}
