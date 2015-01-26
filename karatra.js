
function State() {
    this.attributes = {};
    this.effects = [ {"target":"Health", "modifier":"+1"} ];

    this.hasAttribute = function(attrname) {
        return (attrname in this.attributes);
    }

    this.addAttribute = function(attr) {
        if ("name" in attr) {
            if (attr["name"] in this.attributes) {
                console.log("Attribute already exists.");
            } else {
                this.attributes[attr["name"]] = attr;
            }
        } else {
            console.log("Attribute object has no name field.")
        }
    }

    this.removeAttribute = function(attrname) {
        delete this.attributes[attrname]
    }

    this.applyEffects = function() {
        var newattrs = {};
        // copy
        for (key in this.attributes) {
            newattrs[key] = {}
            attr = this.attributes[key];
            for (f in attr) {
                newattrs[key][f] = attr[f];
            }
        }
        // apply effects
        for (i = 0; i < this.effects.length; i++) {
            effect = this.effects[i];
            target = effect["target"];
            if (!target in this.attributes) {
                console.log("Can't apply effect, attribute " + target + " does not exist.")
            } else {
                // TODO: make something more sophisticated than this
                newattrs[target]["value"] = eval("newattrs[target][\"value\"]" + effect["modifier"]);
            }
        } 
        return newattrs
    }
}

function Pile() {
    this.id = "Pile"+Pile.counter++; 
    this.facedown = true;
    this.cards = new Array(); 

    this.getCard = function() {
        return this.cards.pop();
    }

    this.putCard = function(card) {
        this.cards.push(card);
    }

    this.shuffle = function() {
        var currentIndex = this.cards.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }
    }

}
Pile.counter = 0;

function Player() {
    this.hand = new Array();
}

console.log("Hello cards");

p = new Pile();

for (i = 0; i < 100; i++) {
    p.putCard(i);
}
p.shuffle();

for (i = 0; i < 100; i++) {
    console.log(p.getCard());
}


s = new State();
attr = {"name" : "Health", "value": 30}

console.log("has attr: " + s.hasAttribute(attr["name"]));
s.addAttribute(attr);
console.log("has attr: " + s.hasAttribute(attr["name"]));
console.log("has attr: " + s.hasAttribute(attr["name"]));
console.log(s.applyEffects());
console.log(s.applyEffects());

