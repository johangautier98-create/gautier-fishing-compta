export default function Facture() {
  return (
    <div style={{flex:1,fontFamily:'Segoe UI,system-ui,sans-serif',background:'#f0f4f8',minHeight:'100vh'}}>
      <div style={{background:'#fff',borderBottom:'2px solid #dde8f0',padding:'20px 28px',marginBottom:24}}>
        <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>Ajouter une facture</div>
        <div style={{fontSize:13,color:'#8a9aaa',marginTop:4}}>Photo, PDF ou saisie manuelle</div>
      </div>
      <div style={{padding:'0 28px',maxWidth:700}}>
        <div style={{border:'2px dashed #c8d8e8',borderRadius:16,padding:'40px 20px',textAlign:'center',cursor:'pointer',background:'#fff',marginBottom:24}}>
          <div style={{fontSize:40,marginBottom:12}}>📷</div>
          <div style={{fontSize:16,fontWeight:500,color:'#1a2e40',marginBottom:6}}>Photographier ou importer une facture</div>
          <div style={{fontSize:13,color:'#8a9aaa',marginBottom:16}}>L'IA détecte automatiquement le fournisseur, la date et les montants</div>
          <button style={{background:'#1a2535',color:'#fff',border:'none',borderRadius:10,padding:'12px 28px',fontSize:14,cursor:'pointer',fontWeight:500}}>Ouvrir l'appareil photo</button>
        </div>
        <div style={{background:'#e8f4e8',border:'0.5px solid #a8d8a8',borderRadius:10,padding:'12px 16px',marginBottom:20,display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:'#2a6a2a'}}/>
          <span style={{fontSize:13,color:'#2a5a2a',fontWeight:500}}>Analyse IA terminée — vérifiez et corrigez si besoin</span>
        </div>
        {[
          {label:'Fournisseur',val:'Amazon Pro'},
          {label:'Date du document',val:'11/03/2025'},
          {label:'Numéro de facture',val:'FAC-2025-0821'},
        ].map(f=>(
          <div key={f.label} style={{marginBottom:14}}>
            <label style={{fontSize:12,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.07em',display:'block',marginBottom:5}}>{f.label}</label>
            <input defaultValue={f.val} style={{width:'100%',padding:'10px 14px',border:'0.5px solid #dde8f0',borderRadius:10,fontSize:14,color:'#1a2e40',background:'#fff'}}/>
          </div>
        ))}
        <div style={{marginBottom:14}}>
          <label style={{fontSize:12,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.07em',display:'block',marginBottom:5}}>Catégorie</label>
          <select style={{width:'100%',padding:'10px 14px',border:'0.5px solid #dde8f0',borderRadius:10,fontSize:14,color:'#1a2e40',background:'#fff'}}>
            {['Emballage','Envois / Poste','Matériel','Publicité','Logiciels','Fournitures','Divers'].map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
          {[{label:'Montant HT',val:'63,00 €'},{label:'Montant TTC',val:'76,00 €'}].map(f=>(
            <div key={f.label}>
              <label style={{fontSize:12,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.07em',display:'block',marginBottom:5}}>{f.label}</label>
              <input defaultValue={f.val} style={{width:'100%',padding:'10px 14px',border:'0.5px solid #3d7aad',borderRadius:10,fontSize:14,color:'#1a2e40',background:'#f0f6ff'}}/>
            </div>
          ))}
        </div>
        <button style={{background:'#1a2535',color:'#fff',border:'none',borderRadius:12,padding:'15px',width:'100%',fontSize:15,fontWeight:500,cursor:'pointer',marginBottom:10}}>✓ Valider et enregistrer</button>
        <button style={{background:'#f0f4f8',color:'#5a7a95',border:'0.5px solid #dde8f0',borderRadius:12,padding:'12px',width:'100%',fontSize:14,cursor:'pointer'}}>Annuler</button>
      </div>
    </div>
  )
}