#include <stdio.h>
#include "gates.h"
#include "flipflops.h"
#include "counter.h"
#include "alu.h"

/* Get a valid binary input */
int get_binary_input(char name)
{
    int value;

    while (1)
    {
        printf("Enter input %c (0 or 1): ", name);

        if (scanf("%d", &value) != 1)
        {
            printf("Invalid input! Please enter 0 or 1.\n");

            while (getchar() != '\n')
            {
                /* Clear invalid input */
            }

            continue;
        }

        if (value == 0 || value == 1)
        {
            return value;
        }

        printf("Invalid input! Please enter only 0 or 1.\n");
    }
}

/* Display the main menu */
void display_menu()
{
    printf("\n");
    printf("============================================\n");
    printf("       DIGITAL LOGIC & ALU SIMULATOR\n");
    printf("============================================\n");
    printf("1.  AND Gate\n");
    printf("2.  OR Gate\n");
    printf("3.  NOT Gate\n");
    printf("4.  NAND Gate\n");
    printf("5.  NOR Gate\n");
    printf("6.  XOR Gate\n");
    printf("7.  XNOR Gate\n");
    printf("9.  SR Flip-Flop\n");
    printf("10. D Flip-Flop\n");
    printf("11. JK Flip-Flop\n");
    printf("12. T Flip-Flop\n");
    printf("13. JK Clock Simulator\n");
    printf("14. 4-Bit Binary Counter\n");
    printf("15. 4-Bit ALU\n");
    printf("16. Exit\n");
    printf("============================================\n");
}

/* Wait before returning to the menu */
void continue_message()
{
    printf("\nPress Enter to return to the main menu...");

    while (getchar() != '\n')
    {
        /* Clear input buffer */
    }

    getchar();
}

/* Generate truth table for a two-input gate */
void generate_two_input_table(int gate_choice)
{
    int a, b, output;

    printf("\n");

    switch (gate_choice)
    {
        case 1:
            printf("========== AND GATE TRUTH TABLE ==========\n");
            break;

        case 2:
            printf("========== OR GATE TRUTH TABLE ==========\n");
            break;

        case 4:
            printf("========== NAND GATE TRUTH TABLE ==========\n");
            break;

        case 5:
            printf("========== NOR GATE TRUTH TABLE ==========\n");
            break;

        case 6:
            printf("========== XOR GATE TRUTH TABLE ==========\n");
            break;

        case 7:
            printf("========== XNOR GATE TRUTH TABLE ==========\n");
            break;
    }

    printf("\n");
    printf(" A | B | Y\n");
    printf("-----------\n");

    for (a = 0; a <= 1; a++)
    {
        for (b = 0; b <= 1; b++)
        {
            switch (gate_choice)
            {
                case 1:
                    output = AND_gate(a, b);
                    break;

                case 2:
                    output = OR_gate(a, b);
                    break;

                case 4:
                    output = NAND_gate(a, b);
                    break;

                case 5:
                    output = NOR_gate(a, b);
                    break;

                case 6:
                    output = XOR_gate(a, b);
                    break;

                case 7:
                    output = XNOR_gate(a, b);
                    break;

                default:
                    output = 0;
            }

            printf(" %d | %d | %d\n", a, b, output);
        }
    }

    printf("\n==========================================\n");
}

/* Generate truth table for NOT gate */
void generate_not_table()
{
    int a;

    printf("\n========== NOT GATE TRUTH TABLE ==========\n\n");

    printf(" A | Y\n");
    printf("-------\n");

    for (a = 0; a <= 1; a++)
    {
        printf(" %d | %d\n", a, NOT_gate(a));
    }

    printf("\n==========================================\n");
}

/* Truth table menu */
void truth_table_menu()
{
    int choice;

    printf("\n");
    printf("========== TRUTH TABLE GENERATOR ==========\n");
    printf("1. AND\n");
    printf("2. OR\n");
    printf("3. NOT\n");
    printf("4. NAND\n");
    printf("5. NOR\n");
    printf("6. XOR\n");
    printf("7. XNOR\n");
    printf("8. Return to Main Menu\n");
    printf("===========================================\n");

    printf("Enter your choice: ");

    if (scanf("%d", &choice) != 1)
    {
        printf("\nInvalid choice!\n");

        while (getchar() != '\n')
        {
            /* Clear input */
        }

        continue_message();
        return;
    }

    if (choice >= 1 && choice <= 7)
    {
        if (choice == 3)
        {
            generate_not_table();
        }
        else
        {
            generate_two_input_table(choice);
        }

        continue_message();
    }
    else if (choice != 8)
    {
        printf("\nInvalid choice!\n");
        continue_message();
    }
}

/* SR Flip-Flop simulator */
void sr_flipflop_menu()
{
    int S, R;
    int current_Q = 0;
    int next_Q;

    printf("\n");
    printf("========== SR FLIP-FLOP ==========\n");
    printf("Initial Q = %d\n", current_Q);

    S = get_binary_input('S');
    R = get_binary_input('R');

    next_Q = SR_flipflop(S, R, current_Q);

    printf("\n------------- RESULT --------------\n");

    printf("S        = %d\n", S);
    printf("R        = %d\n", R);
    printf("Previous Q = %d\n", current_Q);

    if (next_Q == -1)
    {
        printf("Next Q   = INVALID\n");
        printf("Status   = Invalid condition (S=1, R=1)\n");
    }
    else
    {
        printf("Next Q   = %d\n", next_Q);

        if (S == 1 && R == 0)
        {
            printf("Operation = SET\n");
        }
        else if (S == 0 && R == 1)
        {
            printf("Operation = RESET\n");
        }
        else
        {
            printf("Operation = HOLD\n");
        }
    }

    printf("-----------------------------------\n");

    continue_message();
}
void jk_clock_simulator()
{
    int cycles;
    int J, K;
    int Q = 0;

    printf("\n========== JK FLIP-FLOP CLOCK SIMULATOR ==========\n");

    printf("Initial Q = 0\n");

    printf("\nEnter number of clock cycles: ");
    scanf("%d", &cycles);

    printf("\nCLOCK   J   K   Q\n");
    printf("------------------\n");

    for (int i = 1; i <= cycles; i++)
    {
        printf("Cycle %d\n", i);

        J = get_binary_input('J');
        K = get_binary_input('K');

        Q = JK_flipflop(J, K, Q);

        printf("  CLK    %d   %d   %d\n", J, K, Q);
    }

    printf("\n===============================================\n");
}

int main()
{
    int choice;
    int a, b;

    printf("\n");
    printf("============================================\n");
    printf("       DIGITAL LOGIC & ALU SIMULATOR\n");
    printf("============================================\n");
    printf("System initialized successfully.\n");

    while (1)
    {
        display_menu();

        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1)
        {
            printf("\nInvalid choice! Please enter a number.\n");

            while (getchar() != '\n')
            {
                /* Clear invalid input */
            }

            continue;
        }

        switch (choice)
        {
            case 1:
                printf("\n========== AND GATE ==========\n");

                a = get_binary_input('A');
                b = get_binary_input('B');

                printf("\nAND Output = %d\n", AND_gate(a, b));

                continue_message();
                break;

            case 2:
                printf("\n========== OR GATE ==========\n");

                a = get_binary_input('A');
                b = get_binary_input('B');

                printf("\nOR Output = %d\n", OR_gate(a, b));

                continue_message();
                break;

            case 3:
                printf("\n========== NOT GATE ==========\n");

                a = get_binary_input('A');

                printf("\nNOT Output = %d\n", NOT_gate(a));

                continue_message();
                break;

            case 4:
                printf("\n========== NAND GATE ==========\n");

                a = get_binary_input('A');
                b = get_binary_input('B');

                printf("\nNAND Output = %d\n", NAND_gate(a, b));

                continue_message();
                break;

            case 5:
                printf("\n========== NOR GATE ==========\n");

                a = get_binary_input('A');
                b = get_binary_input('B');

                printf("\nNOR Output = %d\n", NOR_gate(a, b));

                continue_message();
                break;

            case 6:
                printf("\n========== XOR GATE ==========\n");

                a = get_binary_input('A');
                b = get_binary_input('B');

                printf("\nXOR Output = %d\n", XOR_gate(a, b));

                continue_message();
                break;

            case 7:
                printf("\n========== XNOR GATE ==========\n");

                a = get_binary_input('A');
                b = get_binary_input('B');

                printf("\nXNOR Output = %d\n", XNOR_gate(a, b));

                continue_message();
                break;

            case 8:
                truth_table_menu();
                break;

            case 9:
                sr_flipflop_menu();
                break;

            case 10:

                printf("\n========== D FLIP-FLOP ==========\n");

                 a = get_binary_input('D');

                printf("\nD Input   = %d\n", a);
                printf("Next Q    = %d\n", D_flipflop(a));

                continue_message();
                break;
            case 11:

                {
                int J, K;
                int current_Q;
                int next_Q;

                printf("\n========== JK FLIP-FLOP ==========\n");

                current_Q = get_binary_input('Q');

                J = get_binary_input('J');
                K = get_binary_input('K');

                next_Q = JK_flipflop(J, K, current_Q);

                printf("\n------------- RESULT --------------\n");
                printf("J          = %d\n", J);
                printf("K          = %d\n", K);
                printf("Previous Q = %d\n", current_Q);
                printf("Next Q     = %d\n", next_Q);

                if (J == 0 && K == 0)
                {
                printf("Operation  = HOLD\n");
                }
                else if (J == 0 && K == 1)
                {
                printf("Operation  = RESET\n");
                }
                else if (J == 1 && K == 0)
                {
                printf("Operation  = SET\n");
                }
                else
                {
                printf("Operation  = TOGGLE\n");
                }

                printf("-----------------------------------\n");

                continue_message();
                break;
                }
            case 12:

                {
                int T;
                int current_Q;
                int next_Q;

                printf("\n========== T FLIP-FLOP ==========\n");

                current_Q = get_binary_input('Q');
                T = get_binary_input('T');

                next_Q = T_flipflop(T, current_Q);

                printf("\n------------- RESULT --------------\n");
                printf("T          = %d\n", T);
                printf("Previous Q = %d\n", current_Q);
                printf("Next Q     = %d\n", next_Q);

                if (T == 0)
                {
                printf("Operation  = HOLD\n");
                }
                else
                {
                printf("Operation  = TOGGLE\n");
                }

                printf("-----------------------------------\n");

                continue_message();
                break;
                }
            case 13:
                jk_clock_simulator();
                break;
            case 14:
                four_bit_counter();
                break;
            case 15:
                four_bit_alu();
                break;

            case 16:
                printf("\nExiting Digital Logic Simulator...\n");
                printf("Thank you for using the simulator!\n\n");

                return 0;

            default:
                printf("\nInvalid choice! Please select 1 to 16.\n");
        }
    }

    return 0;
}