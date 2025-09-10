// Clase abstracta que define el "template method"
abstract class Beverage {
  // Template method
  prepare(): string {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();

    return `${this.boilWater()};${this.brew()};${this.pourInCup()};${this.addCondiments()}`;
  }

  private boilWater(): string {
    return "Hervir agua...";
  }

  private pourInCup(): string {
    return "Servir en la taza...";
  }

  // Métodos que cada subclase debe implementar
  protected abstract brew(): void;
  protected abstract addCondiments(): void;
}

// Subclase concreta: prepara té
class Tea extends Beverage {
  protected brew(): string {
    return "Colocar la bolsita de té en el agua caliente";
  }

  protected addCondiments(): string {
    return "Agregar azucar";
  }
}

class TeaWithHoney extends Tea {
  protected addCondiments(): string {
    return "Agregar miel diet";
  }
}

// Subclase concreta: prepara café
class Coffee extends Beverage {
  protected brew(): string {
    return "Filtrar el café molido";
  }

  protected addCondiments(): string {
    return "Agregar azúcar y leche";
  }
}

// Uso
// const tea = new Tea();
// console.log("Preparando té:");
// tea.prepare();

// console.log("\nPreparando café:");
// const coffee = new Coffee();
// coffee.prepare();

// console.log("\nPreparando te con miel:");
// const teawh = new TeaWithHoney();
// teawh.prepare();

const test = () => {
  console.log(
    "TEST:1:1 -> Espero que al crear un té con miel el ultimo paso sea el de agregar el condimento miel"
  );

  const tea_with_honey_test_expected = `Agregar miel`;

  const teaTest = new TeaWithHoney();
  const message = teaTest.prepare();

  const lastString = message.split(";").pop();

  console.log(
    `el test salió: ${
      lastString === tea_with_honey_test_expected ? "ok" : "fail"
    }`
  );
};

test();
