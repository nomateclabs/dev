import { x } from './xscript.mjs';
import { config } from './config.mjs';
import { ls,ss } from './storage.mjs';

const app = {
  build(){

    return this;
  },
  init(){

    let final = document.getElementById('code');

    ClassicEditor
      .create( document.querySelector( '#editor' ), {
        // toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
      })
      .then(function(editor){
        let draft = ls.get('draft');

        editor.model.document.on('change:data', function(){
          let res = editor.getData()
          final.textContent = res;
          ls.set('draft', res)
        });

        if(draft){
          final.textContent = draft;
          editor.setData(draft);
        }

      })
      .catch(function(err){
        console.error(err.stack);
      });

  }
}





  window.onload = function(){
    app.build().init()
  }
