# Citation key formula explanation 
First try to use the Short Title field (`ShortTitle`).
- `auth(clean=true).lower.replace(find="-",replace="") `  
	Get the first author's surname and remove any hyphens.  
- `auth(1,2).replace(/.+/g,'.etal')`  
	If there is a second author, replace their name with '.etal;  
- `year+len('>',5) `  
	4-digit year
- `ShortTitle.skipwords.capitalize.len('>', 1).select(1,2).clean.replace(find="-",replace="").condense('').substring(1,4).prefix(_)`  
- Process the verbatim text of the Short Title field. Get the first four characters  (of the first two words combined) and remove hyphens and spaces.
- `postfix('#%(a)s')`  
	If duplicate cite keys exist, postfix it by adding '#' and a single lowercase letter.

If the Short Title field is empty, try doing the same thing using the Title field (`shorttitle `).