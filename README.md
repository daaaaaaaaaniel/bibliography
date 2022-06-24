# My Bibliography Scripts  
## Better BibTeX for Zotero citation key formula  

### Example  

| key | citation |
|---|---|
| `schaps2004_TICM.3_Mone` | Schaps, David M. “Money before Coinage: The Ancient Near East.” In  *The Invention of Coinage and the Monetization of Ancient Greece*, 34–56. University of Michigan Press, 2004. |


### Explanation  

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

## ZotFile  

### Renaming formula  

`last name of Authors or Editors` - `Chapter` `Title` (`citekey`) 

```
{%a -}{ %C}{ %h| %W} (%b)
```


### Wildcards

- `%B` should be used for creating parent **folders** containing texts in an anthology or essay collection. It outputs text like *bookTitle (year)*.
    - if there's an editor, it should include the editor. If there's no editor, assume it's a monograph and format like *Author year - bookTitle*. 
        -  for monographs, use :`{%a %y - %B}` 
        - for anthologies/collections, use : `{%d (eds.) %y - %B}`
        - `/ZotFile{/%d (eds.) %y - %B}` or just `/ZotFile{/%B (%y)}`
- `%b` is broken… it should function more like `%c` but with RegEx `[^/]+(?=/$|$)` to select the last segment of the path.
- `%P` should be used for indicating the page numbers of book sections. Use it as an {option} wild-card in **filenames**. It makes alphabetical sorting more useful.
- `%W` is for formatting the title field to mimic the short title (?). Use it as a fallback for items without a short title.
- `%C` is for `chapter-number` in the "extras" field.