export default function Exports() {
  return (
    <div style={{flex:1,fontFamily:'Segoe UI,system-ui,sans-serif',background:'#f0f4f8',minHeight:'100vh'}}>
      <div style={{background:'#fff',borderBottom:'2px solid #dde8f0',padding:'20px 28px 0'}}>
        <div style={{fontSize:22,fontWeight:500,color:'#1a2e40',marginBottom:16}}>Exports</div>
        <div style={{display:'flex',gap:3}}>
          {['Jan','Fév','Mars','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc','T1','T2','Annuel'].map((m,i)=>(
            <div key={m} style={{padding:'7px 11px',borderRadius:'6px 6px 0 0',fontSize:12,color:i===2?'#fff':'#7090a8',background:i===2?'#1a2535':'transparent',cursor:'pointer'}}>{m}</div>
          ))}
          <select style={{fontSize:12,border:'0.5px solid #c8d8e8',borderRadius:6,padding:'6px 10px',background:'#fff',marginLeft:6}}><option>2025</option><option>2024</option></select>
        </div>
      </div>
      <div style={{padding:'24px 28px',maxWidth:700}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:12,marginBottom:24}}>
          {[
            {label:'CA sélectionné',val:'8 240 €',sub:'mars 2025'},
            {label:'Dépenses',val:'1 380 €',sub:'14 factures'},
            {label:'Bénéfice estimé',val:'6 860 €',sub:'avant cotisations'},
          ].map(k=>(
            <div key={k.label} style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:16,textAlign:'center'}}>
              <div style={{fontSize:10,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>{k.label}</div>
              <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>{k.val}</div>
              <div style={{fontSize:11,color:'#9ab0c4',marginTop:4}}>{k.sub}</div>
            </div>
          ))}
        </div>
        {[
          {nom:'Récapitulatif mensuel',sub:'CA, dépenses, bénéfice, cotisations',badge:'PDF',bc:'#fce8e8',bt:'#8a2a2a'},
          {nom:'Journal des ventes',sub:'Toutes commandes Shopify + PayPal',badge:'CSV',bc:'#e8f4e8',bt:'#2a6a3a'},
          {nom:'Journal des dépenses',sub:'Factures avec justificatifs liés',badge:'Excel',bc:'#e8f4e0',bt:'#1a6a20'},
          {nom:'Rapport expert-comptable',sub:'Format structuré, toutes catégories',badge:'PDF',bc:'#fce8e8',bt:'#8a2a2a'},
          {nom:'Export URSSAF — cotisations',sub:'CA trimestriel prêt à déclarer',badge:'CSV',bc:'#e8f4e8',bt:'#2a6a3a'},
        ].map(e=>(
          <div key={e.nom} style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:'14px 18px',marginBottom:10,display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
            <div>
              <div style={{fontSize:14,fontWeight:500,color:'#1a2e40'}}>{e.nom}</div>
              <div style={{fontSize:12,color:'#8a9aaa',marginTop:3}}>{e.sub}</div>
            </div>
            <span style={{fontSize:11,padding:'3px 10px',borderRadius:6,background:e.bc,color:e.bt,fontWeight:500}}>{e.badge}</span>
          </div>
        ))}
        <button style={{background:'#1a2535',color:'#fff',border:'none',borderRadius:12,padding:'15px',width:'100%',fontSize:15,fontWeight:500,cursor:'pointer',marginTop:8}}>Télécharger la sélection</button>
      </div>
    </div>
  )
}