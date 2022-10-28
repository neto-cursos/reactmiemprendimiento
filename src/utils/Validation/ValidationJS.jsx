export const validateNumber=(condition)=>{
    condition = parseInt(condition);
		if( !isNaN(condition) && (condition > 0) ) {
			return condition;
		}
		return null;
}

export const validateAbstract=()=>{
    
}