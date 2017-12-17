walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
    var v = textNode.nodeValue;

    var re = /£[0-9]*\.99/g;
    
    function roundUpMoney(inputString, units){
        var unroundedVal = inputString.substring(1);
        var returnVal = Math.ceil(parseFloat(unroundedVal)).toString();
        return units + returnVal + ".00";
    }

    function roundUpMoneyPounds(inputString){
        return roundUpMoney(inputString, "£");
    }
    
    function roundUpMoneyDollars(inputString){
        return roundUpMoney(inputString, "$");
    }

    v = v.replace(/£[0-9]*\.99/g, roundUpMoneyPounds)

    v = v.replace(/\$[0-9]*\.99/g, roundUpMoneyDollars)
    
    
	
	textNode.nodeValue = v;
}

