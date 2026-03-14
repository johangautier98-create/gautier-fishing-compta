export default function Depenses() {
  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',fontFamily:'Segoe UI,system-ui,sans-serif',background:'#f0f4f8',minHeight:'100vh'}}>
      <div style={{background:'#fff',borderBottom:'2px solid #dde8f0',padding:'20px 28px 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
          <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>Dépenses</div>
          <button style={{background:'#1a2535',color:'#fff',border:'none',borderRadius:8,padding:'9px 18px',fontSize:13,cursor:'pointer',fontWeight:500}}>+ Ajouter une facture</button>
        </div>
        <div style={{display:'flex',gap:3}}>
          {['Jan','Fév','Mars','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc','T1','T2','Annuel'].map((m,i)=>(
            <div key={m} style={{padding:'7px 11px',borderRadius:'6px 6px 0 0',fontSize:12,color:i===2?'#fff':'#7090a8',background:i===2?'#1a2535':'transparent',cursor:'pointer'}}>{m}</div>
          ))}
          <select style={{fontSize:12,border:'0.5px solid #c8d8e8',borderRadius:6,padding:'6px 10px',background:'#fff',marginLeft:6}}><option>2025</option><option>2024</option></select>
        </div>
      </div>
      <div style={{padding:'24px 28px',flex:1}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:12,marginBottom:20}}>
          {[
            {label:'Total dépenses',val:'1 380 €',sub:'14 factures · mars',badge:'+3 %',up:false},
            {label:'À valider',val:'3',sub:'pièces incomplètes',badge:'Attention',warn:true},
            {label:'Catégorie principale',val:'Emballage',sub:'420 € ce mois'},
          ].map(k=>(
            <div key={k.label} style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:16,textAlign:'center'}}>
              <div style={{fontSize:10,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>{k.label}</div>
              <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>{k.val}</div>
              <div style={{fontSize:11,color:'#9ab0c4',marginTop:4}}>{k.sub}</div>
              {k.badge && <span style={{fontSize:11,padding:'2px 9px',borderRadius:10,marginTop:7,display:'inline-block',background:k.warn?'#fef4e0':k.up?'#e8f4e8':'#fce8e8',color:k.warn?'#7a5c10':k.up?'#2a6a3a':'#8a2a2a'}}>{k.badge}</span>}
            </div>
          ))}
        </div>
        <div style={{background:'#fef8e8',border:'0.5px solid #f0d468',borderRadius:10,padding:'11px 16px',fontSize:13,color:'#7a5c10',marginBottom:18,display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:7,height:7,borderRadius:'50%',background:'#d4a010'}}/>
          3 factures à vérifier — fournisseur non reconnu ou montant suspect.
        </div>
        <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
          {['Toutes','Emballage','Envois','Publicité','Logiciels','Divers'].map((f,i)=>(
            <button key={f} style={{background:i===0?'#1a2535':'#fff',color:i===0?'#fff':'#5a7a95',border:'0.5px solid #c8d8e8',borderRadius:20,padding:'5px 14px',fontSize:12,cursor:'pointer'}}>{f}</button>
          ))}
        </div>
        <div style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:20}}>
          <div style={{fontSize:11,fontWeight:500,color:'#4a6a85',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:14,display:'flex',justifyContent:'space-between'}}>
            Factures enregistrées — mars 2025 <span style={{fontSize:12,color:'#3d7aad',textTransform:'none',fontWeight:400,cursor:'pointer'}}>Exporter Excel →</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.6fr) 90px 60px 90px 80px',gap:8,padding:'8px 0',borderBottom:'0.5px solid #f0f4f8'}}>
            {['Fournisseur','Catégorie','Date','Montant TTC','Justificatif'].map(h=><span key={h} style={{fontSize:11,color:'#b0c4d8',textTransform:'uppercase',letterSpacing:'.04em'}}>{h}</span>)}
          </div>
          {[
            {nom:'Amazon Pro',meta:'Emballages carton ×50',tag:'Emballage',tagC:'#e6f1fb',tagT:'#185FA5',date:'11/03',amt:'−76 €',ok:true},
            {nom:'La Poste',meta:'Colissimo ×4',tag:'Envois',tagC:'#e1f5ee',tagT:'#0F6E56',date:'13/03',amt:'−18 €',ok:true},
            {nom:'Meta Ads',meta:'Campagne mars',tag:'Publicité',tagC:'#eeedfe',tagT:'#534AB7',date:'05/03',amt:'−150 €',ok:true},
            {nom:'Shopify',meta:'Abonnement mensuel',tag:'Logiciel',tagC:'#f4f0fa',tagT:'#4a3a7a',date:'01/03',amt:'−29 €',ok:true},
            {nom:'Fournisseur inconnu',meta:'Non identifié',tag:'À vérifier',tagC:'#fef4e0',tagT:'#7a5c10',date:'07/03',amt:'−43 €',ok:false},
          ].map(r=>(
            <div key={r.nom} style={{display:'grid',gridTemplateColumns:'minmax(0,1.6fr) 90px 60px 90px 80px',gap:8,padding:'9px 0',borderBottom:'0.5px solid #f0f4f8',alignItems:'center',background:r.ok?'transparent':'#fefcf4',borderRadius:r.ok?0:8}}>
              <div><div style={{fontSize:13,color:'#1a2e40',fontWeight:500}}>{r.nom}</div><div style={{fontSize:11,color:'#9ab0c4'}}>{r.meta}</div></div>
              <span style={{fontSize:10,padding:'2px 8px',borderRadius:6,background:r.tagC,color:r.tagT,display:'inline-block'}}>{r.tag}</span>
              <span style={{fontSize:12,color:'#9ab0c4'}}>{r.date}</span>
              <span style={{fontSize:13,fontWeight:500,color:'#8a2a2a'}}>{r.amt}</span>
              <span style={{fontSize:11,color:r.ok?'#3d7aad':'#c07a10',cursor:'pointer'}}>{r.ok?'Voir PDF':'Corriger'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}