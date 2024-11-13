let game;

window.onload = function() {

    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: "#1e105a",
        dom: {
            createContainer: true // Enables DOM elements
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1920,
            height: 1080,
        },
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: [Voting]
    };
    game = new Phaser.Game(gameConfig);
    window.focus();
}


class Voting extends Phaser.Scene {

    constructor() {
        super("Voting")
        this.candidate_1_name = "Aino Bäcklund"
        this.candidate_2_name = "Eetu Knutars"
        this.candidate_1 = 0;
        this.candidate_2 = 0;
        this.total = 0;
        this.winCondition = 0;
    }

    preload() {
        // Load any assets if necessary
        this.load.image("candidate_1_img", "assets/aino2024_gray_alter.png");
        this.load.image("candidate_2_img", "assets/eetuk2024_gray_alter.png");
        this.load.image("logo", "assets/lateksii_logo.png");
        this.load.image("white_house", "assets/white_house.png");
        this.load.image("radiance", "assets/radiance.png");
    }
    
    create() {
        // Retrieve numbers from localStorage
        const total_votes = parseFloat(localStorage.getItem('total_votes'));
        const required_votes = parseFloat(localStorage.getItem('required_votes'));
        this.total = total_votes;
        this.winCondition = required_votes;

        this.radiance_left = this.add.image(game.config.width*0.2, game.config.height*0.39, "radiance")
        this.radiance_right = this.add.image(game.config.width*0.8, game.config.height*0.39, "radiance")

        this.radiance_left.setScale(0.4)
        this.radiance_right.setScale(0.4)
        this.radiance_left.setVisible(0)
        this.radiance_right.setVisible(0)

        this.candidate_1_img = this.add.image(game.config.width*0.2, game.config.height*0.39, "candidate_1_img")
        this.candidate_2_img = this.add.image(game.config.width*0.8, game.config.height*0.39, "candidate_2_img")
        this.candidate_1_img.setScale(0.15)
        this.candidate_2_img.setScale(0.15)
        

        this.house = this.add.image(game.config.width*0.5, game.config.height*0.4, "white_house")
        this.house.setScale(5)

        this.lateksii_logo = this.add.image(game.config.width*0.5, game.config.height*0.415, "logo")
        this.lateksii_logo.setScale(0.06)


        this.backgroudBar = this.add.rectangle(this.game.config.width*0.5, this.game.config.height*0.6, this.game.config.width*0.81, 120, 0x000000)
        this.emptyBar = this.add.rectangle(this.game.config.width*0.5, this.game.config.height*0.6, this.game.config.width*0.8, 100, 0xa5a2a6)
        this.leftBar = this.add.rectangle(this.game.config.width*0.1, this.game.config.height*0.6, 0, 100, 0x40e0d0)
        this.rightBar = this.add.rectangle(this.game.config.width*0.9, this.game.config.height*0.6, 0, 100, 0xd43dcf)


        this.main_title = this.add.text(this.game.config.width*0.21, this.game.config.height*0.12, "LATEKSII RY:N PUHEENJOHTAJA 2025", {
            fontSize: "60px",
            fontFamily: "Arial",
            fill: "#FFFFFF"
        });

        this.main_title_2 = this.add.text(this.game.config.width*0.3, this.game.config.height*0.2, "VAALIEN TULOSLASKENTA", {
            fontSize: "60px",
            fontFamily: "Arial",
            fill: "#FFFFFF"
        });

        this.total_value = this.add.text(this.game.config.width*0.4845, this.game.config.height*0.7, this.winCondition-1, {
            fontSize: "60px",
            fontFamily: "Arial",
            fill: "#FFFFFF"
        });

        this.info_text = this.add.text(this.game.config.width*0.29, this.game.config.height*0.82, "Voittoon tarvitaan " + this.winCondition + " valitsijaa.", {
            fontSize: "60px",
            fontFamily: "Arial",
            fill: "#FFFFFF"
        });

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , second: '2-digit' , hour12: false })

        this.info_text_2 = this.add.text(
            this.game.config.width * 0.165, 
            this.game.config.height * 0.9, 
            `Lähde: paperilaput, tilanne 14.11.2024 ${timeString}`, 
            {
                fontSize: "60px",
                fontFamily: "Arial",
                fill: "#FFFFFF"
            }
        );

        

        

        this.candidate_1_status = this.add.text(this.game.config.width*0.35, this.game.config.height*0.67, this.candidate_1, {
            fontSize: "60px",
            fontFamily: "Arial",
            fill: "#FFFFFF"
        });
        this.candidate_2_status = this.add.text(this.game.config.width*0.63, this.game.config.height*0.67, this.candidate_2, {
            fontSize: "60px",
            fontFamily: "Arial",
            fill: "#FFFFFF"
        });
        
        
        this.blockBar = this.add.rectangle(this.game.config.width*0.5, this.game.config.height*0.9, this.game.config.width*0.9, 500, 0x1e105a)
        this.blockText = this.add.text(this.game.config.width*0.085, this.game.config.height*0.8, "Äänestäminen käynnissä. Tulosten lasku ei ole vielä alkanut.", {
            fontSize: "60px",
            fontFamily: "Arial",
            fill: "#FFFFFF"
        });

        this.candidate_1_name = this.add.text(this.game.config.width*0.1, this.game.config.height*0.67, this.candidate_1_name, {
            fontSize: "60px",
            fontFamily: "Arial",
            fill: "#FFFFFF"
        });
        this.candidate_2_name = this.add.text(this.game.config.width*0.72, this.game.config.height*0.67, this.candidate_2_name, {
            fontSize: "60px",
            fontFamily: "Arial",
            fill: "#FFFFFF"
        });

        

        // Set up keys
        this.input.keyboard.on('keydown-D', this.increaseLeftBar, this);
        this.input.keyboard.on('keydown-A', this.decreaseLeftBar, this);
        this.input.keyboard.on('keydown-J', this.increaseRightBar, this);
        this.input.keyboard.on('keydown-L', this.decreaseRightBar, this);
        this.input.keyboard.on('keydown-N', this.showTime, this);
        this.input.keyboard.on('keydown-M', this.noShowTime, this);

        let borderThickness = 5; // Thickness of the dark frame borders

        // Center border
        this.add.rectangle(
            this.game.config.width*0.5,
            this.game.config.height*0.6,
            borderThickness,
            150,
            0xFFFFFF
        );

        
        
    }
    showTime() {
        this.blockBar.setVisible(0)
        this.blockText.setVisible(0)
    }

    noShowTime() {
        this.blockBar.setVisible(1)
        this.blockText.setVisible(1)
    }

    increaseLeftBar() {
        if (this.candidate_1 + this.candidate_2 < this.total) {
            this.candidate_1 += 1;
            this.updateStats();
        }
    }

    decreaseLeftBar() {
        if (this.candidate_1 > 0) {
            this.candidate_1 -= 1;
            this.updateStats();
        }
    }

    increaseRightBar() {
        if (this.candidate_1 + this.candidate_2 < this.total) {
            this.candidate_2 += 1;
            this.updateStats();
        }
    }

    decreaseRightBar() {
        if (this.candidate_2 > 0) {
            this.candidate_2 -= 1;
            this.updateStats();
        }
    }

    updateStats() {
        // Update left bar width
        this.leftBar.width = this.game.config.width*0.8/this.total*this.candidate_1;

        // Update right bar width
        this.rightBar.width = -this.game.config.width*0.8/this.total*this.candidate_2;


        this.candidate_1_status.setText(this.candidate_1);
        this.candidate_2_status.setText(this.candidate_2);

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , second: '2-digit' , hour12: false })

        this.info_text_2.setText(
            `Lähde: paperilaput, tilanne 14.11.2024 ${timeString}`
        
        );
        if (this.candidate_1 >= this.winCondition) {
            this.radiance_left.setVisible(1)
        }
        else {
            this.radiance_left.setVisible(0)
        }
        if (this.candidate_2 >= this.winCondition) {
            this.radiance_right.setVisible(1)
        }
        else {
            this.radiance_right.setVisible(0)
        }
        
    }

    update() {
        // Game logic updates here if needed
    }
}

