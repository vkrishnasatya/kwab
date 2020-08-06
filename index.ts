
class Kwab{
    private static instance: Kwab;
    private el: HTMLElement;
    private routes: any;
    constructor(el: any) {
        this.el = el;
	this.routes = [];
    }

    static getInstance(): Kwab {
	if(!Kwab.instance)
		throw Error("no instance found");
	return Kwab.instance;
    }

    appendRoute(path: string, component: string) {
      	this.routes.push({"path": path,"component": component});
    }
    
    getView(path: string) {
       let { component } = this.routes.find(i => i["path"] == path);
       this.el.appendChild(document.createElement(component));    
    }

}

window.addEventListener("popstate", function(event: any) {
      	let instance = Kwab.getInstance();
    	instance.getView(window.location.pathname);
});

function createElement(component: any,props: any,children: any) {
         let el = document.createElement(component);
	 el = (<any>Object).assign(el,props);
	 el.append(...children);
	 return el;
}

function route(pathname: string, component: string) {
	let instance = Kwab.getInstance();
	instance.appendRoute(pathname, component);
}

export {Kwab, createElement};
