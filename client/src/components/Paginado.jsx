import s from '../styles/home.module.css'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Paginado = ({card,setLimitCard,setPageNumber,pageNumber}) => {
    const count = card.length / 15
    const page = []

    function handlePage(e){
        e.preventDefault();
        const value = Number(e.target.value);
        if(value === 1) setLimitCard({max:14,min:0})
        else setLimitCard({max:value * 15 -1, min: (value -1)*15})
        setPageNumber(value)
        window.scroll({top:0,left:0})
    };

    for (let i = 0; i < count; i++) {
        page.push(i)
    }
  return (
    <div>{page.map(p=><button 
      className={(pageNumber===p+1)?`${s.aPaginado}`:`${s.bPaginado}`} 
      onClick={handlePage} 
      key={p} 
      value={p+1}>{p+1}</button>)}
    </div>
  )
}

export default Paginado