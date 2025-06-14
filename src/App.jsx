import { useState } from "react";
import axios from "axios";

function App() {
  const initialFormData = {
    author: "",
    title: "",
    body: "",
    public: false
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    console.log(name, ":", value, checked, type);
    
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const sendData = (event) => {
    event.preventDefault();
    console.log("Invio dati al server", formData);
    
    axios
      .post("https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts", formData)
      .then((resp) => {
        if (resp.data.id) {
          console.log(resp.data);
          setFormData(initialFormData);
        }
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="h2 mb-2">Crea un nuovo articolo</h1>
              <p className="text-muted">Compila il form per pubblicare il tuo post</p>
            </div>

            {/* Form */}
            <div className="card shadow-sm mb-4">
              <div className="card-body p-4">
                <div onSubmit={sendData}>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Autore</label>
                      <input
                        type="text"
                        className="form-control"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Il tuo nome"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Titolo</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Titolo dell'articolo"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contenuto</label>
                    <textarea
                      className="form-control"
                      name="body"
                      rows="6"
                      value={formData.body}
                      onChange={handleChange}
                      placeholder="Scrivi qui il contenuto..."
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="public"
                        checked={formData.public}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">
                        Pubblica immediatamente
                      </label>
                    </div>
                  </div>

                  <button type="button" onClick={sendData} className="btn btn-primary btn-lg w-100">
                    Pubblica Articolo
                  </button>
                  
                </div>
              </div>
            </div>

            {/* Anteprima */}
            <div className="card shadow-sm">
              <div className="card-header">
                <h5 className="mb-0">Anteprima</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <p>Author:</p>
                    <p className="mb-0 text-muted">{formData.author || "Non inserito"}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p>Title:</p>
                    <p className="mb-0 text-muted">{formData.title || "Non inserito"}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <p>Content:</p>
                    <p className="mb-0 text-muted">{formData.body || "Non inserito"}</p>
                  </div>
                  <div className="col-12">
                    <p>Status:</p>
                    <span className={`badge ms-2 ${formData.public ? 'bg-success' : 'bg-warning'}`}>
                      {formData.public ? 'Pubblico' : 'Bozza'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;