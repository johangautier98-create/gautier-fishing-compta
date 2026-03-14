export default function Ventes() {
  return (
    <div style={{display:'flex',height:'100vh',fontFamily:'Segoe UI,system-ui,sans-serif',background:'#f0f4f8'}}>
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        <div style={{background:'#fff',borderBottom:'2px solid #dde8f0',padding:'20px 28px 0'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
            <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>Ventes</div>
            <div style={{background:'#f0f4f8',border:'0.5px solid #c8d8e8',borderRadius:8,padding:'8px 16px',fontSize:12,color:'#4a6a85',display:'flex',alignItems:'center',gap:7}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:'#2a6a2a'}}/>
              Shopify — synchro il y a 2h &nbsp;↺ Actualiser
            </div>
          </div>
          <div style={{display:'flex',gap:3,paddingBottom:0}}>
            {['Jan','Fév','Mars','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc','T1','T2','Annuel'].map((m,i)=>(
              <div key={m} style={{padding:'7px 11px',borderRadius:'6px 6px 0 0',fontSize:12,color:i===2?'#fff':'#7090a8',background:i===2?'#1a2535':'transparent',cursor:'pointer'}}>{m}</div>
            ))}
            <select style={{fontSize:12,border:'0.5px solid #c8d8e8',borderRadius:6,padding:'6px 10px',background:'#fff',marginLeft:6,marginBottom:2}}><option>2025</option><option>2024</option></select>
          </div>
        </div>
        <div style={{padding:'24px 28px',overflowY:'auto',flex:1}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:12,marginBottom:20}}>
            {[
              {label:'Total encaissé',val:'8 240 €',sub:'mars 2025',badge:'+12 %',up:true},
              {label:'Commandes Shopify',val:'47',sub:'dont 2 remboursées',badge:'−230 €',up:false},
              {label:'Encaissements PayPal',val:'1 240 €',sub:'14 transactions',badge:'+8 %',up:true},
              {label:'Panier moyen',val:'175 €',sub:'par commande',badge:'+5 %',up:true},
            ].map(k=>(
              <div key={k.label} style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:16,textAlign:'center'}}>
                <div style={{fontSize:10,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>{k.label}</div>
                <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>{k.val}</div>
                <div style={{fontSize:11,color:'#9ab0c4',marginTop:4}}>{k.sub}</div>
                <span style={{fontSize:11,padding:'2px 9px',borderRadius:10,marginTop:7,display:'inline-block',background:k.up?'#e8f4e8':'#fce8e8',color:k.up?'#2a6a3a':'#8a2a2a'}}>{k.badge}</span>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
            {['Toutes les sources','Shopify','PayPal','Banque','Remboursements'].map((f,i)=>(
              <button key={f} style={{background:i===0?'#1a2535':'#fff',color:i===0?'#fff':'#5a7a95',border:'0.5px solid #c8d8e8',borderRadius:20,padding:'5px 14px',fontSize:12,cursor:'pointer'}}>{f}</button>
            ))}
          </div>
          <div style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:20}}>
            <div style={{fontSize:11,fontWeight:500,color:'#4a6a85',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:14,display:'flex',justifyContent:'space-between'}}>
              Journal des ventes — mars 2025 <span style={{fontSize:12,color:'#3d7aad',textTransform:'none',fontWeight:400,cursor:'pointer'}}>Exporter CSV →</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.8fr) 90px 100px 60px 80px',gap:8,padding:'8px 0',borderBottom:'0.5px solid #f0f4f8'}}>
              {['Commande','Source','Client','Date','Montant'].map(h=><span key={h} style={{fontSize:11,color:'#b0c4d8',textTransform:'uppercase',letterSpacing:'.04em'}}>{h}</span>)}
            </div>
            {[
              {nom:'Commande #8821',meta:'2 articles',tag:'Shopify',tagC:'#e6f1fb',tagT:'#185FA5',client:'Marie D.',date:'14/03',amt:'+127 €',pos:true},
              {nom:'Encaissement PP-4421',meta:'PayPal direct',tag:'PayPal',tagC:'#e1f5ee',tagT:'#0F6E56',client:'—',date:'12/03',amt:'+89 €',pos:true},
              {nom:'Commande #8820',meta:'1 article',tag:'Shopify',tagC:'#e6f1fb',tagT:'#185FA5',client:'Pierre M.',date:'10/03',amt:'+54 €',pos:true},
              {nom:'Virement entrant',meta:'Compte pro CIC',tag:'Banque',tagC:'#eeedfe',tagT:'#534AB7',client:'—',date:'09/03',amt:'+380 €',pos:true},
              {nom:'Remboursement #8801',meta:'Retour client',tag:'Remboursement',tagC:'#fce8e8',tagT:'#8a2a2a',client:'Lucie B.',date:'08/03',amt:'−45 €',pos:false},
            ].map(r=>(
              <div key={r.nom} style={{display:'grid',gridTemplateColumns:'minmax(0,1.8fr) 90px 100px 60px 80px',gap:8,padding:'9px 0',borderBottom:'0.5px solid #f0f4f8',alignItems:'center'}}>
                <div><div style={{fontSize:13,color:'#1a2e40',fontWeight:500}}>{r.nom}</div><div style={{fontSize:11,color:'#9ab0c4'}}>{r.meta}</div></div>
                <span style={{fontSize:10,padding:'2px 8px',borderRadius:6,background:r.tagC,color:r.tagT,display:'inline-block'}}>{r.tag}</span>
                <span style={{fontSize:12,color:'#1a2e40'}}>{r.client}</span>
                <span style={{fontSize:12,color:'#9ab0c4'}}>{r.date}</span>
                <span style={{fontSize:13,fontWeight:500,textAlign:'right',color:r.pos?'#2a6a3a':'#8a2a2a'}}>{r.amt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}