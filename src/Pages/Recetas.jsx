import React, { useState } from 'react'
import {  OpenAI } from 'openai' // Dependencia de OpenAI

export const Recetas = () => {
   
     
     /*  // Usamos el objeto OpenAIApi() de OpenAI 
      const openAi = new OpenAI({ apiKey: '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'});
     
      // Hacemos uso de useState() de React     
      const [prompt, setPrompt] = useState('');
      const [result, setResult] = useState('');
      const [loading, setLoading] = useState(false);
     
      // Cuando el usuario presione el botón 'Enviar' cambiamos el
      // estado de setLoading a true
      const handleClick = async () => {
     
        setLoading(true);
        // Mediante try enviamos el modelo, prompt y demás detalles
        try {
          const response = openAi.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 100,
          })
     
          //Obtenemos la respuesta desde ChatGPT 
          setResult((await response).data.choices[0].text);
     
          // Cambiamos el estado de setLoading a false 
          setLoading(false);
        } catch (error) {
          // Si hubo un error lo obtenemos y cambiamos el estado de setLoading a false 
          console.log(error)
          setLoading(false)
        }
     
      } */

  return (
    <div>
        {/* <div class="col-md-12">
              <h2>Nube ChatGPT by Nube Colectiva</h2>
              <div class="mb-3">
              {
                result.length > 0 && <div id="resultados" className="alert alert-success" role="alert">{result}</div>
              }
              <textarea type='text' className="form-control" rows="5" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Ingresa tu consulta'></textarea>
              <button type="button" className="btn btn-primary mt-3" onClick={handleClick} disabled={loading || prompt.length === 0}>{loading ? "Generando..." : "Enviar"}</button><br /><br />
              </div>
            </div> */}

    </div>
  )
}
