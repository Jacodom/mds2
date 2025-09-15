import { ClassicBaristaBuilder } from "./barista-classic";
import { GourmetBaristaBuilder } from "./barista-gourmet";
import { CoffeeMenu } from "./coffee-menu";

// Usando un barista clásico
const classicBarista = new ClassicBaristaBuilder();
const classicMenu = new CoffeeMenu(classicBarista);

classicMenu.makeEspresso();
const espressoClasico = classicBarista.getResult();
espressoClasico.show();

// Usando un barista gourmet
const gourmetBarista = new GourmetBaristaBuilder();
const gourmetMenu = new CoffeeMenu(gourmetBarista);

gourmetMenu.makeLatte();
const latteGourmet = gourmetBarista.getResult();
latteGourmet.show();
