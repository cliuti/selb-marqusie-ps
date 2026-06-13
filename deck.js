/* ============================================================
   Apresentação Marquise × Selbetti — interatividade & dados
   ============================================================ */
(function(){
  const BRL = n => 'R$\u00A0' + Math.round(n).toLocaleString('pt-BR');
  const NUM = n => Math.round(n).toLocaleString('pt-BR');

  /* ---------- DATA ---------- */
  // Comparativo por filial/CNPJ [nome, qtd, atual, upgrade]
  const FILIAIS = [
    ["MRQ. Serv. Amb. (75417)",39,12175,13315],
    ["Marquise Empreend. (07.406.242/0001-29)",21,6870,8239],
    ["Centro Fashion (75322)",15,1896,3785],
    ["Ecofor Ambiental SA (75277)",12,4726,5725],
    ["Construtora Marquise SA (75304) – 21985",10,21317,17239],
    ["EcoOsasco Ambiental SA (75273)",9,6562,7178],
    ["EcoTaubaté Ambiental SA (75335)",9,1353,2624],
    ["Construtora Marquise SA (75291)",7,2326,3302],
    ["Ecofor Ambiental SA (75509)",6,1292,2660],
    ["Construtora Marquise SA (75285)",4,2156,3046],
    ["Marquise Serv. Amb. SA (75300)",4,3760,3550],
    ["Braseco SA (76373)",3,767,1308],
    ["Consórcio Barragem Pedreira (146965)",3,4729,4423],
    ["Construtora Marquise SA (75286)",3,415,823],
    ["Marquise Mandara by YOO (75525)",3,1306,1720],
    ["Construtora Marquise SA (75304) - 25394",3,543,769],
    ["Consórcio Adutor Ceará Lote 3 (145832)",2,3871,3435],
    ["Consórcio Mobilidade Iguatu",2,105,702],
    ["Consórcio Rio Manso (146960)",2,2006,2095],
    ["CTR Bahia Destinação Resíduos (75674)",2,2701,2539],
    ["Marquise Serv. Amb. SA (75275)",2,3887,3639],
    ["Marquise Empreend. SA (75274) - 24547",2,4001,3022],
    ["Consórcio Marquise PB (81649)",1,1274,1322],
    ["Const. Marquise (0044)",1,0,447],
    ["EcoCaucaia Ambiental SA (75643)",1,223,368],
    ["EcoManaus Ambiental SA (75586)",1,35,471],
    ["Marquise Bothanic (149616)",1,83,251],
    ["Marquise Serv. Amb. SA (149655)",1,286,650],
    ["Marquise Serv. Amb. SA (75326)",1,280,416],
    ["MLar Cambeba Lago (154418)",1,0,447],
    ["SMTC Properties Ltda. (149485)",1,126,262],
    ["Construtora Marquise SA (75304) - 24430",1,567,590],
  ];

  // Volume de impressão (Jan/Fev/Mar 2026) — R$
  const VOL_PB = [
    ["Marquise Serv. Amb. SA (75417)",10373],
    ["Construtora Marquise SA (75304) – 21985",10000],
    ["Marquise Empreend. SA (75274)",7948],
    ["Ecofor Ambiental SA (75277)",6613],
    ["EcoOsasco Ambiental SA (75273)",6525],
    ["Centro Fashion (75322)",4140],
    ["Construtora Marquise SA (75291)",4036],
    ["EcoTaubaté Ambiental SA (75335)",3389],
  ];
  const VOL_COR = [
    ["Construtora Marquise SA (75304) – 21985",55184],
    ["Marquise Serv. Amb. SA (75417)",43741],
    ["Marquise Empreend. SA (75274) - 24547",25519],
    ["Consórcio Marquise PB (81649)",14258],
    ["Marquise Empreend. SA (75274)",11407],
    ["Construtora Marquise SA (75285)",10931],
    ["Consórcio Barragem Pedreira (146965)",9976],
    ["Marquise Serv. Amb. SA (75300)",8350],
  ];

  // Top 10 locais maior custo (Março/2026) [local, contrato, atual, upgrade]
  const TOP_LOCAIS = [
    ["Sala Técnica","Construtora Marquise SA (75304)",11392,8302],
    ["Tráfego","EcoOsasco Ambiental SA (75273)",4985,4414],
    ["Social Itapiúna/CE","Construtora Marquise SA (75304)",4333,3463],
    ["SMS Senador Pompeu / Quixadá","Marquise Empreend. SA (75274)",4001,3022],
    ["Financeiro / ADM Eixão das Águas","Marquise Empreend. SA (75274)",3871,3302],
    ["Administrativo","Marquise Serv. Amb. SA (75300)",3581,2922],
    ["Barragem Pedreira","Consórcio Barragem Pedreira (146965)",3156,2734],
    ["Obra Transnordestina Sen. Pompeu","Construtora Marquise SA (75304)",2766,2333],
    ["Administrativo Incinerador","Marquise Serv. Amb. SA (75275)",2468,2173],
    ["Administrativo","CTR Bahia Destinação Resíduos (75674)",2334,2029],
  ];

  // Top 10 Matriz por mês [equip, local, atual, upgrade]
  const MATRIZ = {
    jan:[["2MC5","Engenharia de Infraestrutura",2378,1653],["KIU4","Licitação",2161,1500],["3ZI3","Incorporação",1706,1211],["2MC6","Comercial SAS",1661,1145],["2CQ7","Controladoria / Diretoria",1654,1136],["5TF6","Licitação – Bothanic Residence",1063,786],["TGB1","Family Office",997,685],["2ME7","Diretoria de Infra",950,653],["48FM","Incorporadora",918,636],["7SM9","Diretoria – Valéria Gondim",872,603]],
    fev:[["2MC5","Engenharia de Infraestrutura",3705,2565],["3ZI3","Incorporação",2522,1781],["2LQ9","Marketing",2458,1697],["KIU4","Licitação",1746,1213],["2MD4","SESMT",693,553],["2ME6","Financeiro",532,446],["5TF6","Licitação - Bothanic Residence",494,379],["00PE","Contabilidade",333,273],["2ME5","Arquivo",225,188],["2ME4","Financeiro",216,181]],
    mar:[["2MC6","Comercial SAS",1799,1248],["2MC5","Engenharia de Infraestrutura",1214,854],["2MC3","Comercial",1016,771],["2LQ9","Marketing",968,672],["3ZI3","Incorporação",830,590],["2MD4","SESMT",794,614],["7SM9","Diretoria – Valéria Gondim",747,517],["5YZ8","1BKP - Diretoria Valéria Girão",647,445],["0LQ7","Núcleo Gestão",501,350],["2MD2","Diretoria Aglaia",460,316]],
    abr:[["0LQ7","Núcleo Gestão",5478,3775],["2MC5","Engenharia de Infraestrutura",1923,1360],["3ZI3","Incorporação",1503,1072],["2MC6","Comercial SAS",1256,871],["5YZ8","Diretoria - Valéria Girão",1179,814],["7SM9","Diretoria – Valéria Gondim",1012,701],["48FM","Incorporadora",1010,700],["2LQ9","Marketing",998,706],["2CQ7","Controladoria / Diretoria",947,650],["TGB1","Family Office",890,611]],
    mai:[["3ZI3","Incorporação",2112,1491],["2MC5","Engenharia de Infraestrutura",1459,1021],["2MC6","Comercial SAS",1284,887],["2CQ7","Controladoria / Diretoria",1064,731],["0LQ7","Núcleo Gestão",885,616],["7SM9","Diretoria – Valéria Gondim",816,567],["5YZ8","Diretoria Valéria Girão",728,501],["48FM","Incorporadora",705,490],["TGB1","Family Office",693,476],["2MD4","SESMT",599,457]],
  };
  const MES_NOME = {jan:"Janeiro",fev:"Fevereiro",mar:"Março",abr:"Abril",mai:"Maio"};

  /* ---------- RENDER: Slide filiais (two columns) ---------- */
  function renderFiliais(){
    const host = document.getElementById('tbl-filiais');
    if(!host) return;
    const mid = Math.ceil(FILIAIS.length/2);
    const cols = [FILIAIS.slice(0,mid), FILIAIS.slice(mid)];
    let totA=0, totU=0, totQ=0;
    FILIAIS.forEach(r=>{ totQ+=r[1]; totA+=r[2]; totU+=r[3]; });
    host.innerHTML = cols.map(col=>{
      const rows = col.map(r=>{
        const diff = r[3]-r[2];
        const cls = diff<=0 ? 'down':'up';
        const tri = diff<=0 ? '▼':'▲';
        return `<tr>
          <td><span class="fl">${r[0]}</span></td>
          <td class="q">${r[1]}</td>
          <td>${BRL(r[2])}</td>
          <td>${BRL(r[3])}</td>
          <td class="${cls}">${tri}\u00A0${BRL(Math.abs(diff))}</td></tr>`;
      }).join('');
      return `<table class="tbl mini"><thead><tr>
        <th>Filial / CNPJ</th><th>Qtd</th><th>Atual</th><th>Upgrade</th><th>Dif.</th>
      </tr></thead><tbody>${rows}</tbody></table>`;
    }).join('');
    // totals
    const tt = document.getElementById('fil-tot');
    if(tt){
      tt.querySelector('[data-q]').textContent = NUM(totQ);
      tt.querySelector('[data-a]').textContent = BRL(totA);
      tt.querySelector('[data-u]').textContent = BRL(totU);
    }
  }

  /* ---------- RENDER: Volume bars ---------- */
  function renderVolume(){
    [['vol-pb',VOL_PB,'o'],['vol-cor',VOL_COR,'g']].forEach(([id,data,cls])=>{
      const host=document.getElementById(id);
      if(!host) return;
      const max=Math.max(...data.map(d=>d[1]));
      host.innerHTML = data.map(d=>`
        <div class="vrow">
          <div class="vname">${d[0]}</div>
          <div class="vbarwrap">
            <div class="bar-track"><div class="bar-fill ${cls}" data-w="${(d[1]/max*100).toFixed(1)}" style="width:${(d[1]/max*100).toFixed(1)}%"></div></div>
            <div class="vval mono">${BRL(d[1])}</div>
          </div>
        </div>`).join('');
    });
  }

  /* ---------- RENDER: Top 10 locais ---------- */
  function renderTopLocais(){
    const host=document.getElementById('tbl-locais');
    if(!host) return;
    let tA=0,tU=0;
    const rows=TOP_LOCAIS.map((r,i)=>{
      const diff=r[3]-r[2]; tA+=r[2]; tU+=r[3];
      const pct=(1-r[3]/r[2])*100;
      return `<tr>
        <td class="rk">${i+1}</td>
        <td><span class="fl">${r[0]}</span><span class="sub">${r[1]}</span></td>
        <td>${BRL(r[2])}</td>
        <td>${BRL(r[3])}</td>
        <td class="down">▼\u00A0${BRL(Math.abs(diff))}</td>
        <td class="pctcell"><span class="pct mono">−${pct.toFixed(0)}%</span></td>
      </tr>`;
    }).join('');
    host.innerHTML=`<table class="tbl"><thead><tr>
      <th>#</th><th>Local / Contrato</th><th>Atual</th><th>Upgrade</th><th>Economia</th><th>%</th>
    </tr></thead><tbody>${rows}</tbody>
    <tfoot><tr>
      <td></td><td>Total Top 10</td><td>${BRL(tA)}</td><td>${BRL(tU)}</td>
      <td class="down">▼\u00A0${BRL(tA-tU)}</td><td class="pctcell"><span class="pct mono">−${((1-tU/tA)*100).toFixed(0)}%</span></td>
    </tr></tfoot></table>`;
  }

  /* ---------- RENDER: Matriz por mês (interactive) ---------- */
  let curMes='jan';
  function renderMatriz(mes){
    curMes=mes;
    const data=MATRIZ[mes];
    const host=document.getElementById('tbl-matriz');
    if(!host) return;
    const max=Math.max(...data.map(d=>d[2]));
    let tA=0,tU=0;
    const rows=data.map((r,i)=>{
      const diff=r[2]-r[3]; tA+=r[2]; tU+=r[3];
      const pct=(diff/r[2]*100);
      return `<tr style="--bw:${(r[2]/max*100).toFixed(1)}%">
        <td class="rk">${i+1}</td>
        <td class="eq mono">${r[0]}</td>
        <td><span class="fl">${r[1]}</span></td>
        <td class="barcell"><span class="minibar"><i style="width:${(r[2]/max*100).toFixed(1)}%"></i></span></td>
        <td>${BRL(r[2])}</td>
        <td class="upg">${BRL(r[3])}</td>
        <td class="down">▼&#160;${BRL(diff)}</td>
      </tr>`;
    }).join('');
    host.innerHTML=`<table class="tbl matriz"><thead><tr>
      <th>#</th><th>Equip.</th><th>Local</th><th></th><th>Atual</th><th>Upgrade</th><th>Economia</th>
    </tr></thead><tbody>${rows}</tbody></table>`;
    // header totals
    const eco=tA-tU;
    setText('mz-mes',MES_NOME[mes]);
    animateValue(document.getElementById('mz-eco'), eco, v=>BRL(v));
    animateValue(document.getElementById('mz-atual'), tA, v=>BRL(v));
    setText('mz-pct','−'+((eco/tA)*100).toFixed(0)+'%');
    // active tab
    document.querySelectorAll('#mes-tabs .mtab').forEach(b=>{
      b.classList.toggle('on', b.dataset.mes===mes);
    });
  }

  function setText(id,t){ const e=document.getElementById(id); if(e) e.textContent=t; }

  /* ---------- Counters ---------- */
  function animateValue(el, target, fmt, dur){
    if(!el) return;
    dur = dur||1100;
    const start=performance.now();
    const from = 0;
    function tick(now){
      let p=Math.min(1,(now-start)/dur);
      p = 1-Math.pow(1-p,3); // easeOutCubic
      el.textContent = fmt(from+(target-from)*p);
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function runCounters(scope){
    scope.querySelectorAll('[data-count]').forEach(el=>{
      const target=parseFloat(el.dataset.count);
      const dec=parseInt(el.dataset.decimals||'0',10);
      const pre=el.dataset.prefix||'';
      const suf=el.dataset.suffix||'';
      const isBRL=el.dataset.brl!==undefined;
      const fmt=v=>{
        let s = isBRL ? Math.round(v).toLocaleString('pt-BR')
                      : v.toLocaleString('pt-BR',{minimumFractionDigits:dec,maximumFractionDigits:dec});
        return pre+s+suf;
      };
      animateValue(el, target, fmt, parseInt(el.dataset.dur||'1200',10));
    });
  }

  function runBars(scope){
    scope.querySelectorAll('.bar-fill[data-w]').forEach(el=>{
      el.style.width='0';
      requestAnimationFrame(()=>{ requestAnimationFrame(()=>{ el.style.width=el.dataset.w+'%'; }); });
    });
  }

  /* ---------- Slide activation ---------- */
  function activate(section){
    const slide = section.querySelector('.slide');
    if(!slide) return;
    // replay entrance, then clear .anim so settled slides screenshot/print cleanly
    slide.classList.remove('anim');
    void slide.offsetWidth;
    slide.classList.add('anim');
    clearTimeout(slide._animT);
    slide._animT = setTimeout(()=>slide.classList.remove('anim'), 1700);
    runCounters(slide);
    runBars(slide);
  }

  /* ---------- init ---------- */
  function init(){
    renderFiliais();
    renderVolume();
    renderTopLocais();
    renderMatriz('jan');

    // month tabs
    const tabs=document.getElementById('mes-tabs');
    if(tabs){
      tabs.addEventListener('click',e=>{
        const b=e.target.closest('.mtab'); if(!b) return;
        renderMatriz(b.dataset.mes);
      });
    }

    const stage=document.querySelector('deck-stage');
    if(stage){
      stage.addEventListener('slidechange',e=>{ if(e.detail.slide) activate(e.detail.slide); });
      // activate first
      const first=stage.querySelector('section');
      if(first) requestAnimationFrame(()=>activate(first));
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
