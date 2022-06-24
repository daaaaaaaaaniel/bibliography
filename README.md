# Citation key formula 

## Example

| key | citation |
|---|---|
| `schaps2004_TICM.3_Mone` | Schaps, David M. “Money before Coinage: The Ancient Near East.” In  *The Invention of Coinage and the Monetization of Ancient Greece*, 34–56. University of Michigan Press, 2004. |


## Explanation 

First try to use the Short Title field (`ShortTitle`).

- `authEtal2(clean=true).lower.replace(find="-",replace="").replace(find=/\..*/,replace='.etal')`  
	- `authEtal2`   
	The last name of the first author, and the last name of the second author if there are two authors or ".etal" if there are more than two
	- `.lower.replace(find="-",replace="").replace(find=/\..*/,replace='.etal')`  
	Lowercase. Remove any hyphens. Remove the second author. (Technically, remove everything after the first "." and replace it with ".etal".)   
- `year+len('>',5) `  
	4-digit year
- `ShortTitle.skipwords.capitalize.len('>', 1).select(1,2).clean.replace(find="-",replace="").condense('').substring(1,4).prefix(_)`  
- Process the verbatim text of the Short Title field. Get the first four characters  (of the first two words combined) and remove hyphens and spaces.
- `postfix('#%(a)s')`  
	If duplicate cite keys exist, postfix it by adding '#' and a single lowercase letter.

- `BookTitle.clean.replace(find=/[a-z0-9\s]+/g,replace="").condense('').substring(1,4).prefix('_')+extra(session).clean.len('>',0).prefix('.')`  
	For book chapters, additionally include the book title (abbr. in all caps) and chapter number. 

If the Short Title field is empty, try doing the same thing using the Title field (`shorttitle `).

