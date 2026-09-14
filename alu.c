#include <stdio.h>
#include "alu.h"
int get_4bit_input(char name)
{
    int value;

    while (1)
    {
        printf("Enter 4-bit value %c (0000-1111): ", name);
        scanf("%d", &value);

        if (value >= 0 && value <= 1111)
        {
            int b0 = value % 10;
            int b1 = (value / 10) % 10;
            int b2 = (value / 100) % 10;
            int b3 = (value / 1000) % 10;

            if ((b0 == 0 || b0 == 1) &&
                (b1 == 0 || b1 == 1) &&
                (b2 == 0 || b2 == 1) &&
                (b3 == 0 || b3 == 1))
            {
                return b3 * 8 + b2 * 4 + b1 * 2 + b0;
            }
        }

        printf("Invalid input! Please enter exactly 4 binary digits.\n");
    }
}
void print_4bit(int value)
{
    printf("%d%d%d%d",
           (value >> 3) & 1,
           (value >> 2) & 1,
           (value >> 1) & 1,
           value & 1);
}
void four_bit_alu()
{
    int A, B;
    int operation;
    int result;

    printf("\n========== 4-BIT ALU ==========\n");

    A = get_4bit_input('A');
    B = get_4bit_input('B');

    printf("\nSelect Operation:\n");
    printf("1. ADD\n");
    printf("2. SUBTRACT\n");
    printf("3. AND\n");
    printf("4. OR\n");
    printf("5. XOR\n");
    printf("6. NOT A\n");

    printf("\nEnter choice: ");
    scanf("%d", &operation);

    if (operation == 1)
    {
        result = A + B;

        printf("\nA      = ");
        print_4bit(A);

        printf("\nB      = ");
        print_4bit(B);

        printf("\nADD    = ");
        print_4bit(result);
        printf("\n");
    }
    else if (operation == 2)
    {
        result = A - B;

        if (result < 0)
        {
            result = result & 15;
        }

        printf("\nA          = ");
        print_4bit(A);

        printf("\nB          = ");
        print_4bit(B);

        printf("\nSUBTRACT   = ");
        print_4bit(result);
        printf("\n");
    }
    else if (operation == 3)
    {
        result = A & B;

        printf("\nA      = ");
        print_4bit(A);

        printf("\nB      = ");
        print_4bit(B);

        printf("\nAND    = ");
        print_4bit(result);
        printf("\n");
    }
    else if (operation == 4)
    {
        result = A | B;

        printf("\nA      = ");
        print_4bit(A);

        printf("\nB      = ");
        print_4bit(B);

        printf("\nOR     = ");
        print_4bit(result);
        printf("\n");
    }
    else if (operation == 5)
    {
        result = A ^ B;

        printf("\nA      = ");
        print_4bit(A);

        printf("\nB      = ");
        print_4bit(B);

        printf("\nXOR    = ");
        print_4bit(result);
        printf("\n");
    }
    else if (operation == 6)
    {
        result = (~A) & 15;

        printf("\nA          = ");
        print_4bit(A);

        printf("\nNOT A      = ");
        print_4bit(result);
        printf("\n");
    }
    else
    {
        printf("\nInvalid operation!\n");
    }

    printf("\n================================\n");
}